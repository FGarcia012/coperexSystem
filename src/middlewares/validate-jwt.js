import jwt from "jsonwebtoken"
import Admin from "../admin/admin.model.js"

export const validateJWT = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers['authorization'];

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'No existe token en la petición'
            });
        }

        token = token.replace(/^Bearer\s+/, "");

        const { aid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log(`Token aid: ${aid}`); // Log the aid from the token

        const admin = await Admin.findById(aid);
        console.log(`Admin found: ${admin}`); // Log the admin found

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: 'El administrador no existe en la base de datos'
            });
        }

        if (!admin.status) {
            return res.status(400).json({
                success: false,
                message: 'Administrador desactivado previamente'
            });
        }

        req.administrador = admin;
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al validar el token',
            error: err.message
        });
    }
};