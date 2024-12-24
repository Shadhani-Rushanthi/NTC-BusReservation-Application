import mongoose from "mongoose";

const seatReservationModel = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true }
    }
)

const SeatReservation = mongoose.model('SeatReservationModel', SeatReservation)

export default SeatReservation;