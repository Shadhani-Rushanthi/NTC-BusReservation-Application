import BusOperator from "../models/BusOperator.js";
import BusSchedule from "../models/BusScheduleModel.js";
import BusSeatReservation from "../models/BusSeatReservationModel.js";
import { BusReservationMail } from "../utils/emailTemplates.js";
import { passengerBusStatus } from "../utils/publicEnum.js";
import { sendEmail } from "./MailController.js";


export const reserveASeat = async (req, res, next) => {
    try {
        console.log(req.user)
        const parameters = req.body;
        const researved = await BusSeatReservation.find({runTimeId:parameters.runTimeId});

        if (researved.length == 0 ) {
            const newBusSchedule = new BusSeatReservation ({
                runTimeId: parameters.runTimeId,
                noOfSeats: parameters.noOfSeats,
                bookedNoOfSeats: parameters.bookedSeatNumbers.length,
                reservedSeats: [], 
                totalPrice: (parameters.bookedSeatNumbers.length * parameters.SeatProce)
            })
            parameters.bookedSeatNumbers.forEach( seatNo => {
                var seat ={
                    seatNumber: seatNo, 
                    passengerId: req.user.id,
                    bookedTime:  new Date(parameters.bookedAt),
                    status: parameters.PaymentCompleted ? passengerBusStatus.paied : passengerBusStatus.confirmed
                } 
                newBusSchedule.reservedSeats.push(seat)
            })
            await newBusSchedule.save();
        } else {
            // const isScheduled = researved[0].reservedSeats.some(seats =>
            //     seats.passengerId === req.user.id
            // );
            // if (isScheduled) {
            //     return res.status(200).json("The user hae  is aready scheduled on this time on this date");
            // }

            researved[0].bookedNoOfSeats = researved[0].bookedNoOfSeats + parameters.bookedSeatNumbers.length,
            researved[0].totalPrice = researved[0].totalPrice + (parameters.bookedSeatNumbers.length * parameters.SeatProce)
            parameters.bookedSeatNumbers.forEach( seatNo => {
                var seat ={
                    seatNumber: seatNo, 
                    passengerId: req.user.id,
                    bookedTime:  parameters.bookedAt,
                    status: parameters.PaymentCompleted ? passengerBusStatus.paied : passengerBusStatus.confirmed
                } 
                researved[0].reservedSeats.push(seat)
            })
            //await researved[0].save();
        }
        var scheduleDetails = await BusSchedule.findOne(
            {"runTimes._id": parameters.runTimeId},
            { busid: 1, "runTimes.$": 1 }
        )
        var busNo = await BusOperator.findOne(
            {"busDetails._id": scheduleDetails.busid},
            {"busDetails.$": 1}
        )
        const template = BusReservationMail(req.user, scheduleDetails.runTimes, busNo.busDetails[0].busNo)
        if(sendEmail(template, req.user.email)) return res.status(200).json("The bus reservation completed");
    } catch (error) {
        console.log(error)
    }
}

export const viewUserReservations = async (req, res, next) => {
    try {
        const userId = req.params.id
        const reservations = BusSeatReservation.find({"reservedSeats.passengerId": userId})
    } catch (error) {
        console.log(error)
    }
}