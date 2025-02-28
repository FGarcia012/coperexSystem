import ExcelJS from 'exceljs';
import { join } from 'path';
import fs from 'fs/promises';
import Company from "./company.model.js";

export const addCompany = async (req, res) => {
    try {
        const data = req.body;

        const company = await Company.create(data);

        return res.status(201).json({
            message: 'Company has been created',
            name: company.name,
            manager: company.manager,
            impactLevel: company.impactLevel,
            yearsOfExperience: company.yearsOfExperience,
            category: company.category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error when adding company',
            error: err.message
        });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { eid } = req.params
        const data = req.body

        const company = await Company.findByIdAndUpdate(eid, data, { new: true })

        return res.status(200).json({
            success: true,
            message: 'company has been updated',
            company
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'error when updating company',
            error: err.message
        })
    }
}

export const getCompanys = async (req, res) => {
    try {
        const { sortBy, order, filterBy, filterValue } = req.body;

        let query = {};
        if (filterBy && filterValue) {
            query[filterBy] = filterValue;
        }

        let sort = {};
        if (sortBy) {
            sort[sortBy] = order === 'desc' ? -1 : 1;
        }

        const companies = await Company.find(query).sort(sort);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Companies');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Manager', key: 'manager', width: 30 },
            { header: 'Impact Level', key: 'impactLevel', width: 20 },
            { header: 'Years of Experience', key: 'yearsOfExperience', width: 20 },
            { header: 'Category', key: 'category', width: 20 }
        ];

        companies.forEach(company => {
            worksheet.addRow({
                id: company._id,
                name: company.name,
                manager: company.manager,
                impactLevel: company.impactLevel,
                yearsOfExperience: company.yearsOfExperience,
                category: company.category
            });
        });

        const filePath = join('public', 'uploads', 'excel-companys', `companies-${Date.now()}.xlsx`);
        await workbook.xlsx.writeFile(filePath);

        return res.status(200).json({
            success: true,
            message: 'Excel file generated successfully',
            filePath
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error when fetching company',
            error: err.message
        });
    }
};