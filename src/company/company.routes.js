import { Router } from 'express'
import { addCompany, updateCompany, getCompanys } from "./company.controller.js"
import { addCompanyValidator, updateCompanyValidator } from "../middlewares/company-validators.js"

const router = Router();

/**
 * @swagger
 * /company/addCompany:
 *   post:
 *     summary: Add a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               manager:
 *                 type: string
 *               impactLevel:
 *                 type: string
 *               yearsOfExperience:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company has been created
 *       500:
 *         description: Error when adding company
 */
router.post("/addCompany", addCompanyValidator, addCompany);

/**
 * @swagger
 * /company/updateCompany/{eid}:
 *   put:
 *     summary: Update an existing company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: eid
 *         required: true
 *         schema:
 *           type: string
 *         description: The company ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               manager:
 *                 type: string
 *               impactLevel:
 *                 type: string
 *               yearsOfExperience:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: company has been updated
 *       500:
 *         description: error when updating company
 */
router.put("/updateCompany/:eid", updateCompanyValidator, updateCompany);

/**
 * @swagger
 * /company/getCompanys:
 *   get:
 *     summary: Get all companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Excel file generated successfully
 *       500:
 *         description: Error when fetching company
 */
router.get("/getCompanys", getCompanys);

export default router;