import express from 'express'

const adminRoute = express.Router();

// Define your routes
adminRoute.get('/', (req, res) => {
    res.send('Bus Operator Route');
});

export default adminRoute;