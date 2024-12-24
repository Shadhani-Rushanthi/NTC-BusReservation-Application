import express from 'express'
import { adminRegister, busOperatorRegister, commuterRegister } from '../controllers/AuthController.js';

const authRoute = express.Router();


/**
 * @swagger
 *  /auth/adminRegister:
 *   post:
 *     summary: Register an admin to the system
 *     description: This endpoint registers a new admin and returns the admin ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Admin's username
 *                 example: admin123
 *               password:
 *                 type: string
 *                 description: Admin's password
 *                 example: securePassword
 *               email:
 *                 type: string
 *                 description: Admin's email address
 *                 example: admin@example.com
 *     responses:
 *       200:
 *         description: Successfully registered admin
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Success message with admin ID
 *               example: "12345 Admin created Successfully"
 *       409:
 *         description: Conflict - Admin already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Admin email already exists."
 *       500:
 *         description: Internal Server Error
 */
authRoute.post('/adminRegister', adminRegister);


/**
 * @swagger
 * /auth/busOperatorRegister:
 *   post:
 *     summary: Register a bus operator
 *     description: This endpoint registers a new bus operator for Admin approval and returns the operator ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *                 description: The bus operator's business name
 *                 example: "TravelCo"
 *               email:
 *                 type: string
 *                 description: The bus operator's email
 *                 example: operator@example.com
 *               password:
 *                 type: string
 *                 description: The bus operator's password
 *                 example: securePassword
 *               location:
 *                 type: string
 *                 description: Location of the operator's business
 *                 example: "New York"
 *               NoOfBusses:
 *                 type: number
 *                 description: Number of buses the operator manages
 *                 example: 10
 *     responses:
 *       200:
 *         description: The Business Id is 123. The Business abc company waiting for the approval. You will get an Email when approved
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Success message with operator ID
 *               example: "The Business Id is 123. The Business abc company waiting for the approval. You will get an Email when approved"
 */
authRoute.post('/busOperatorRegister', busOperatorRegister);


/**
 * @swagger
 * /auth/commuterRegister:
 *   post:
 *     summary: Register a commuter
 *     description: This endpoint registers a new commuter and returns the commuter ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Commuter's first name
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: Commuter's last name
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 description: Commuter's email address
 *                 example: commuter@example.com
 *               password:
 *                 type: string
 *                 description: Commuter's password
 *                 example: securePassword
 *     responses:
 *       200:
 *         description: Successfully registered commuter
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Success message with commuter ID
 *               example: "12345 Commutor created Successfully"
 *       409:
 *         description: Conflict - Commuter already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Commutor email already exists."
 *       500:
 *         description: Internal Server Error
 */
authRoute.post('/commuterRegister', commuterRegister);

export default authRoute;