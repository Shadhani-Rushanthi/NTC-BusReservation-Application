import express from 'express'
import { addBusRoutes, ApproveOrRejectBusDetails, ApproveOrRejectBusOperator, getBusDetailsForApproval, getBusOperatorsForApproval, getRegisteredBusOperators, getRejectedBusOperators } from '../controllers/AdminController.js';
import { verifyToken } from '../utils/verifyToken.js';

const adminRoute = express.Router();

adminRoute.get('/GetPendingBusOperators', verifyToken, getBusOperatorsForApproval)

adminRoute.get('/getBusDetailsForApproval', verifyToken, getBusDetailsForApproval)

adminRoute.put('/ApproveOrRejectBusOperator/:id/:status', verifyToken, ApproveOrRejectBusOperator)

adminRoute.post('/ApproveOrRejectBusDetails/:id/:busNo/:status', verifyToken,  ApproveOrRejectBusDetails)

adminRoute.get('/ViewRegisteredBusOperators', verifyToken,  getRegisteredBusOperators)

adminRoute.get('/ViewRejectedBusOperators', verifyToken,  getRejectedBusOperators)

adminRoute.post('/addBusRoutes', verifyToken, addBusRoutes)

export default adminRoute;