import mongoose from "mongoose";

const busSeatReservationModel = new mongoose.Schema(
    {
        runTimeId: { type: String, required: true, uniqe: true },
        noOfSeats: { type: Number, required: true },
        bookedNoOfSeats: { type: Number, required: true, default: 0 },
        reservedSeats: [
            {
                seatNumber: { type: Number, required: true }, 
                passengerId: { type: String, required: true },
                bookedTime:  { type: Date, required: true},
                status: { type: Number, required: true }
            },
        ],
        totalPrice: { type: Number, required: true, default: 0 },
        fullBooked: { type: Boolean, required: true , default: false},
    }
)

const BusSeatReservation = mongoose.model('BusSeatReservation', busSeatReservationModel)

export default BusSeatReservation;