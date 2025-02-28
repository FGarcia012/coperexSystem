import Admin from "../admin/admin.model.js"
import Company from "../company/company.model.js"

export const emailExist = async (email = "") => {
    const existe = await Admin.findOne({ email });
    if (existe) {
        throw new Error(`The email ${email} is already registered`);
    }
};

export const usernameExist = async (username = "") => {
    const existe = await Admin.findOne({ username });
    if (existe) {
        throw new Error(`The username ${username} is already registered`);
    }
};

export const companyExist = async (eid = "") => {
    const existe = await Company.findById(eid);
    if (!existe) {
        throw new Error(`No existe la empresa con el ID proporcionado`);
    }
};