import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import swagegrUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import authRoute from './routes/auth.js';
import adminRoute from './routes/admin.js';
import busOperatorRoute from './routes/busOperator.js';
import commutorRoute from './routes/commutor.js';
import dotenv from 'dotenv';
import YAML from 'yamljs';

const app = express()
const port =3000

dotenv.config()

//Connect to MonogoDB
mongoose
    .connect(process.env.MONGOURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

//routes
app.use('/auth', authRoute)
app.use('/admin', adminRoute)
app.use('/busOperator', busOperatorRoute)
app.use('/commutor', commutorRoute)

//swagger
const swaggerOption = {
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'NTC Bus Reservation System API',
            version: '1.0.0',
            description: 'Swagger API documentation for bus reservation system'
        },
        servers: [
            {
                url: 'https://api-df69.onrender.com'
            }
        ]
    },
    apis:['./routes/*.js'],
};

const swaggerDocs = YAML.load('./swagger.yaml')
app.use('/api-docs', swagegrUi.serve, swagegrUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log('Server is runnig')
})