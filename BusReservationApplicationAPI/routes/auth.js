import express from 'express'

const authRoute = express.Router();

// Define your routes
authRoute.get('/', (req, res) => {
    res.send('Bus Operator Route');
});
export default authRoute;