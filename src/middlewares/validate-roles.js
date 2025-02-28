export const hasRoles = (...roles) => {
    return (req,res,next) => {
        if(!req.administrador){
            return res.status(500).json({
                success: false,
                message:'se quiere verificar un rol antes de validar el token'
            })
        }

        if(!roles.includes(req.administrador.role)){
            return res.status(401).json({
                success: false,
                message: `El servicio requiere uno de estos roles: ${roles}`
            })
        }
        next()
    }
}