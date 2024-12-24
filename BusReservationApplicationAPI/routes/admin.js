import express from 'express'
import { ApproveBusOperator, getBusOperatorsForApproval, getRegisteredBusOperators, getRejectedBusOperators } from '../controllers/AdminController.js';

const adminRoute = express.Router();

/**
 * @swagger
 *  /admin/GetPendingBusOperators:
 *   get:
 *     summary: Get pending bus operators for approval
 *     description: This endpoint retrieves all bus operators with a pending status for approval.
 *     responses:
 *       200:
 *         description: Successfully retrieved pending bus operators or no pending operators.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message or notification of no pending operators.
 *                   example: "No pending Bus Operators"
 *                 data:
 *                   type: array
 *                   description: List of pending bus operators (if any).
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier for the bus operator.
 *                         example: "62c45e6b4f1a2b0012e8f89a"
 *                       name:
 *                         type: string
 *                         description: Name of the bus operator.
 *                         example: "John Doe Transport"
 *                       status:
 *                         type: string
 *                         description: Current status of the bus operator.
 *                         example: "Pending"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Internal Server Error"
 */
adminRoute.get('/GetPendingBusOperators', getBusOperatorsForApproval)

adminRoute.post('/ApproveBusOperator/:id/:status', ApproveBusOperator)

adminRoute.get('/ViewRegisteredBusOperators', getRegisteredBusOperators)

adminRoute.get('/ViewRejectedBusOperators', getRejectedBusOperators)

export default adminRoute;