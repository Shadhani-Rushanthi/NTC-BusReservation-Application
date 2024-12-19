import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
        adminName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role : {type: Array, required: true}
    }
)

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;