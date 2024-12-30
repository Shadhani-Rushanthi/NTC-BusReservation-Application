import express from 'express'
import { adminLogin, adminRegister, busOperatorLogin, busOperatorRegister, commuterRegister, commutorLogin } from '../controllers/AuthController.js';

const authRoute = express.Router();


authRoute.post('/adminRegister', adminRegister);

authRoute.post('/busOperatorRegister', busOperatorRegister);

authRoute.post('/commuterRegister', commuterRegister);

authRoute.post('/adminLogin/:email/:password', adminLogin)

authRoute.post('/busOperatorLogin/:email/:password', busOperatorLogin)

authRoute.post('/commutorLogin/:email/:password', commutorLogin)

export default authRoute;