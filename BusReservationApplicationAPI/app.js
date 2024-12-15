import express from 'express';
import mongoose, { version } from 'mongoose';
import cors from 'cors';
import swagegrUi, { serve } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import authRoute from './routes/auth.js';
import adminRoute from './routes/admin.js';
import busOperatorRoute from './routes/busOperator.js';
import commutorRoute from './routes/commutor.js';


const app = express()
const port =3000
const mongoURI ='mongodb+srv://Shadhani:NTC%402000@cluster0.i2b3p.mongodb.net/BusReservationSystem'

//Connect to MonogoDB
mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err))

app.use(express.json())
app.use(cors)

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
                url: 'http://localhost:3000'
            }
        ]
    },
    apis:['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOption)
app.use('/api-docs', swagegrUi.serve, swagegrUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log('Server is runnig')
})