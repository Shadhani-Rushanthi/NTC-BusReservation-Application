import express from 'express'
import { searchBusses } from '../controllers/Commutor.js';
import { reserveASeat, viewUserReservations } from '../controllers/BusSeatReservationController.js';
import { verifyToken } from '../utils/verifyToken.js';

const commutorRoute = express.Router();

commutorRoute.get('/', (req, res) => {
    res.send('Bus Operator Route');
});


commutorRoute.get('/searchBusses', searchBusses)

commutorRoute.post('/reserveSeat', verifyToken, reserveASeat)
commutorRoute.get('/viewUserReservations/:id', verifyToken, viewUserReservations)

export default commutorRoute;