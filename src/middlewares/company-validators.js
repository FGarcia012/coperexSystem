import { body, param } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"
import { hasRoles } from "./validate-roles.js"
import { validateJWT } from "./validate-jwt.js"
import { companyExist } from "../helpers/db-validators.js"

export const addCompanyValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("manager").notEmpty().withMessage("El nombre del gerente es requerido"),
    body("impactLevel").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("yearsOfExperience").notEmpty().withMessage("El año de experiencia es requerido"),
    body("category").notEmpty().withMessage("La categoría es requerida"),
    validarCampos,
    handleErrors
]

export const updateCompanyValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("eid").isMongoId().withMessage("No es un ID válido"),
    param("eid").custom(companyExist),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("manager").notEmpty().withMessage("El nombre del gerente es requerido"),
    body("impactLevel").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("yearsOfExperience").notEmpty().withMessage("El año de experiencia es requerido"),
    body("category").notEmpty().withMessage("La categoría es requerida"),
    validarCampos,
    handleErrors
]