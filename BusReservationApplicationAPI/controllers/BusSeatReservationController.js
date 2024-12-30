import BusOperator from "../models/BusOperator.js";
import BusSchedule from "../models/BusScheduleModel.js";
import BusSeatReservation from "../models/BusSeatReservationModel.js";
import Commutor from "../models/Commutor.js";
import { BusReservationMail } from "../utils/emailTemplates.js";
import { passengerBusStatus } from "../utils/publicEnum.js";
import { sendEmail } from "./MailController.js";


export const reserveASeat = async (req, res, next) => {
    try {
        console.log(req.user)
        const parameters = req.body;
        const researved = await BusSeatReservation.find({runTimeId:parameters.runTimeId});
        var reservation =''
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
            reservation = await newBusSchedule.save();
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
            reservation = await researved[0].save();
        }
        var scheduleDetails = await BusSchedule.findOne(
            {"runTimes._id": parameters.runTimeId},
            { busid: 1, "runTimes.$": 1 }
        )
        var busNo = await BusOperator.findOne(
            {"busDetails._id": scheduleDetails.busid},
            {"busDetails.$": 1}
        )

        // var rese = await Commutor.findByIdAndUpdate(
        //     req.user.id,
        //     { $push: { reservations: status } },
        //     { new: true }
        // )
        const template = BusReservationMail(req.user, scheduleDetails.runTimes, busNo.busDetails[0].busNo)
        if(sendEmail(template, req.user.email)) return res.status(200).json("The bus reservation completed");
    } catch (error) {
        console.log(error)
    }
}

export const viewUserReservations = async (req, res, next) => {
    try {
        var userReservationLists = []
        const userId = req.user.id
        const reservations = await BusSeatReservation.find(
            { "reservedSeats.passengerId": userId }, 
            {runTimeId: 1, "reservedSeats": 1 }
        );
        
        for (const reservation of reservations) {
                const busRunTme = await BusSchedule.find(
                    {"runTimes._id": reservation.runTimeId},
                    { busid: 1, "runTimes.$": 1 }
                )
                const bus = await BusOperator.find(
                    {"busDetails._id": busRunTme[0].busid},
                    { businessName: 1, "busDetails.$": 1 }
                )

                var seatNos=[]
                reservation.reservedSeats.forEach( rs=> {
                    rs.passengerId === userId ? seatNos.push(rs.seatNumber) : ''
                });
            
                var reservationDetails = {
                    runTimeId: reservation.runTimeId,
                    busid: bus[0].busDetails[0].id,
                    busNo: bus[0].busDetails[0].busNo,
                    businessName: bus[0].businessName,
                    startTime: busRunTme[0].runTimes[0].startTime.toString(),
                    endTime: busRunTme[0].runTimes[0].endTime.toString(),
                    startFrom: busRunTme[0].runTimes[0].startFrom,
                    endFrom: busRunTme[0].runTimes[0].endFrom,
                    seatNo: seatNos
                }
                userReservationLists.push(reservationDetails)
        }
        return res.status(200).json(userReservationLists)

    } catch (error) {
        console.log(error)
    }
}


export const cancelReservation = async (req, res, next) => {
    try {
        var userReservationLists = []
        const reservations = await BusSeatReservation.findOne(
            { "runTimeId": req.body.runTimeId, "reservedSeats.passengerId": req.user.id, "reservedSeats.seatNumber": req.body.seatNo },
            { noOfSeats: 1,bookedNoOfSeats:1, totalPrice:1,fullBooked:1,
                  "reservedSeats": 1 }
        );
        
        for (const reservedSeat of reservations.reservedSeats) {
                var seatNos=[]                
                if(reservedSeat.passengerId === req.user.id && reservedSeat.seatNumber === req.body.seatNo) {
                    reservedSeat.status = passengerBusStatus.canceled
                    reservations.bookedNoOfSeats -= 1
                    reservations.totalPrice -= req.body.totalPrice
                    reservations.fullBooked ?  reservedSeat.fullBooked = false : ''
                }
        }
        return res.status(200).json(reservations)

    } catch (error) {
        console.log(error)
    }
}