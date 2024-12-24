import mongoose from "mongoose";

const commutorSchema = new mongoose.Schema(
    {
        //id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role : {type: Array, required: true}
    },{
        timestamps:true
    }
)

const Commutor = mongoose.model('Commutor', commutorSchema);

export default Commutor;