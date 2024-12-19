import express from 'express';

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

export default busOperatorRoute;