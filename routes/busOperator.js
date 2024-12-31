import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { addBuses, editBusOperatpr, scheduleABus, viewBOBusdetails, viewBusSchedules, viewBusSeatReservations } from '../controllers/BusOperatorController.js';

const busOperatorRoute = express.Router();

busOperatorRoute.post('/editBusOperator', verifyToken, editBusOperatpr)

busOperatorRoute.post('/addBuses', verifyToken, addBuses)

busOperatorRoute.post('/scheduleABus', verifyToken,  scheduleABus)

busOperatorRoute.get('/viewBOBusdetails/', verifyToken,  viewBOBusdetails)

busOperatorRoute.get('/viewBusSchedules/:busid', verifyToken,  viewBusSchedules)

busOperatorRoute.get('/viewBusSeatReservations/:runTimeId', verifyToken,  viewBusSeatReservations)

export default busOperatorRoute;