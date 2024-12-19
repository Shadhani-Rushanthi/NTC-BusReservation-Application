import mongoose from "mongoose";

const busOperatorSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
        businessName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        location: { type: String, required: true },
        NoOfBusses: { type: Int32Array, required: true },
        role : {type: Array, required: true},
        busDetails: {
            busNo:  {type: String, required: true },
            PermitNo:  {type: String, required: true },
            NoOfSeats:  {type: String, required: true },
        }
    }
)

const BusOperator = mongoose.model('BusOperator', busOperatorSchema);

export default BusOperator;