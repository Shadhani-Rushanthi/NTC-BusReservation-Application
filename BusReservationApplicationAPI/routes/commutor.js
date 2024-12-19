import express from 'express'

const commutorRoute = express.Router();

commutorRoute.get('/', (req, res) => {
    res.send('Bus Operator Route');
});

export default commutorRoute;