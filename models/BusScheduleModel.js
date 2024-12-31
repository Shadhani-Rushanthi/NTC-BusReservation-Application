import mongoose from "mongoose";

const busScheduleModel = new mongoose.Schema(
    {
        busid: { type: String, required: true, uniqe: true },
        noOfSeats: { type: Number, required: true },
        routeId: { type: Number, required: true },
        runTimes: [
            {
                date: { type: Date, required: true },
                startTime: { type: Date, required: true },
                endTime: { type: Date, required: true },
                startFrom: { type: String, required: true },
                endFrom: { type: String, required: true },
                status: { type: Number, required: true },
                price: { type: Number, required: true },
                driverName: { type: String, required: true },
                driverLicenseNo: { type: String, required: true },
                conductorName: { type: String, required: true },
                conductorId: { type: String, required: true },
                replacedWith: { 
                   status: { type: Boolean, required: false, default: false },
                   busNo: { type: Number, required: false, default: '' },
                   runTimeId: { type: Date, required: false, default: '' }
                },
            }
        ] 
    }
)

const BusSchedule = mongoose.model('BusSchedule', busScheduleModel)

export default BusSchedule;