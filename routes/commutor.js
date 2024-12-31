import express from 'express'
import { searchBusses } from '../controllers/Commutor.js';
import { cancelReservation, reserveASeat, viewUserReservations } from '../controllers/BusSeatReservationController.js';
import { verifyToken } from '../utils/verifyToken.js';

const commutorRoute = express.Router();

commutorRoute.post('/searchBusses', searchBusses)

commutorRoute.post('/reserveSeat', verifyToken, reserveASeat)

commutorRoute.get('/viewUserReservations', verifyToken, viewUserReservations)

commutorRoute.post('/cancelReservation/', verifyToken, cancelReservation)

export default commutorRoute;