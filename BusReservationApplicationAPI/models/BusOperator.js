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
                busNo:  {type: String, required: false },
                PermitNo:  {type: String, required: false },
                NoOfSeats:  {type: String, required: false },
            }
        ]
    },{
        timestamps:true
    }
)

const BusOperator = mongoose.model('BusOperator', busOperatorSchema);

export default BusOperator;