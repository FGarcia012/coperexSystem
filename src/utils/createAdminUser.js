import Admin from "../admin/admin.model.js";
import { hash } from "argon2";

export const createAdminUser = async () => {
    try {
        const adminUser = {
            name: "Admin",
            surname: "User",
            username: "adminLeading",
            email: "admin@kinal.edu.gt",
            password: await hash("AdminPassword123!"),
            phone: "12345678",
            role: "ADMIN",
            status: true
        };

        const existingAdmin = await Admin.findOne({ role: "ADMIN" });

        if (!existingAdmin) {
            await Admin.create(adminUser);
            console.log("Admin user created successfully.");
        } else {
            console.log("Admin user already exists.");
        }
    } catch (err) {
        console.error("Error creating admin user:", err.message);
    }
};