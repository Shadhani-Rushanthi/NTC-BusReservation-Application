import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { addBuses, editBusOperatpr, scheduleABus, viewBOBusdetails, viewBusSchedules, viewBusSeatReservations } from '../controllers/BusOperatorController.js';

const busOperatorRoute = express.Router();

busOperatorRoute.post('/editBusOperator', verifyToken, editBusOperatpr)

busOperatorRoute.post('/addBuses', verifyToken, addBuses)

busOperatorRoute.post('/scheduleABus', scheduleABus)

busOperatorRoute.get('/viewBOBusdetails/:id', viewBOBusdetails)

busOperatorRoute.get('/viewBusSchedules/:busid', viewBusSchedules)

busOperatorRoute.get('/viewBusSeatReservations/:runTimeId', viewBusSeatReservations)

export default busOperatorRoute;