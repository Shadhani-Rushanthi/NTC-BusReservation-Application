import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { addBuses, editBusOperatpr, scheduleABus, viewBOBusdetails, viewBusSchedules, viewBusSeatReservations } from '../controllers/BusOperatorController.js';

const busOperatorRoute = express.Router();

/**
 * @swagger
 * /api/busOperator:
 *   get:
 *     summary: Test endpoint
 *     description: Returns a test message
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, World!
 */
busOperatorRoute.get('/', (req, res) => {
    res.send('Bus Operator Route');
});

busOperatorRoute.post('/editBusOperator', verifyToken, editBusOperatpr)

busOperatorRoute.post('/addBuses', verifyToken, addBuses)

busOperatorRoute.post('/scheduleABus', scheduleABus)

busOperatorRoute.get('/viewBOBusdetails/:id', viewBOBusdetails)

busOperatorRoute.get('/viewBusSchedules/:busid', viewBusSchedules)

busOperatorRoute.get('/viewBusSeatReservations/:runTimeId', viewBusSeatReservations)

export default busOperatorRoute;