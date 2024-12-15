import express from 'express';

const router = express.Router();

// Define your routes
router.get('/', (req, res) => {
    res.send('Bus Operator Route');
});

export default router;