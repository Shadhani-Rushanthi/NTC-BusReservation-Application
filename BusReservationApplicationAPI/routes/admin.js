import express from 'express'
import { addBusRoutes, ApproveOrRejectBusDetails, ApproveOrRejectBusOperator, getBusDetailsForApproval, getBusOperatorsForApproval, getRegisteredBusOperators, getRejectedBusOperators } from '../controllers/AdminController.js';

const adminRoute = express.Router();

adminRoute.get('/GetPendingBusOperators', getBusOperatorsForApproval)

adminRoute.get('/getBusDetailsForApproval', getBusDetailsForApproval)

adminRoute.post('/ApproveOrRejectBusOperator/:id/:status', ApproveOrRejectBusOperator)

adminRoute.post('/ApproveOrRejectBusDetails/:id/:busNo/:status', ApproveOrRejectBusDetails)

adminRoute.get('/ViewRegisteredBusOperators', getRegisteredBusOperators)

adminRoute.get('/ViewRejectedBusOperators', getRejectedBusOperators)

adminRoute.post('/addBusRoutes', addBusRoutes)

export default adminRoute;