import mongoose from "mongoose";

const busOperatorSchema = new mongoose.Schema(
    {
        //id: { type: String, required: false, auto: true },
        businessName: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        status: {type: Number, required: true},
        location: { type: String, required: true },
        NoOfBusses: { type: Number, required: true },
        role : {type: Array, required: true},
        busDetails: [
            {
                PermitNo:  {type: String, required: false, unique: true },
                busNo:  {type: String, required: false, unique: true },
                noOfSeats:  {type: Number, required: false },
                condition:  {type: String, required: false },
                structure:  {type: String, required: false },
                routeID:  {type: Number, required: false },
                Status: {type: Number, required: false },
            }
        ]
    },{
        timestamps:true
    }
)

const BusOperator = mongoose.model('BusOperator', busOperatorSchema);

export default BusOperator;