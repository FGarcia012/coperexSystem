import { Router } from 'express';
import { register, login } from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middlewares/admin-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin has been created
 *       500:
 *         description: Admin registration failed
 */
router.post("/register", uploadProfilePicture.single("profilePicture"), registerValidator, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login as an admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: login failed, server Error
 */
router.post("/login", loginValidator, login);

export default router;