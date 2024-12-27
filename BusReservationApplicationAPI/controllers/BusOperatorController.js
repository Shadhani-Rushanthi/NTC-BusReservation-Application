import BusOperator from "../models/BusOperator.js";
import BusSchedule from "../models/BusScheduleModel.js";
import BusSeatReservation from "../models/BusSeatReservationModel.js";
import { busOperatorStatus, runningBusStatus } from "../utils/publicEnum.js";

export const editBusOperatpr = async (req, res, next) => {
    try {
        const {id, businessName, email, password, location, NoOfBusses } = req.body;
        let updatedData = { businessName, email, location, NoOfBusses };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }
        const updatedBusOperator = await BusOperator.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true }
        );

        if (!updatedBusOperator) {
            return res.status(404).json("Bus Operator not found" );
        }

        res.status(200).json({
            message: "Bus Operator details updated successfully",
            updatedBusOperator
        });
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const addBuses = async ( req, res, next) => {
    try {
        const operator = await BusOperator.findById(req.body.id);

        if (!operator) {
            return res.status(200).json("Bus operator not found");
        }

        const isDuplicate = operator.busDetails.some(bus =>
            bus.PermitNo === req.body.PermitNo || bus.busNo === req.body.busNo
        );
        if (isDuplicate) {
            return res.status(200).json("Duplicate PermitNo or busNo found");
        }

        const busDetail = {
            PermitNo:  req.body.PermitNo,
            busNo:  req.body.busNo,
            noOfSeats:  req.body.noOfSeats,
            condition:  req.body.condition,
            routeID:  req.body.routeID,
            structure: req.body.structure,
            Status: busOperatorStatus.Pending
        }

        operator.busDetails.push(busDetail);
        await operator.save();

        return res.status(200).json(" The bus " + req.body.busNo+ " under the permit " + req.body.PermitNo + " has been sent to for the approval. You will get an Email when approved");
    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const scheduleABus = async ( req, res, next) => {
    try {
        const Bus = await BusSchedule.find({busid:req.body.busid});

        if (Bus.length === 0 ) {
            const newBusSchedule = new BusSchedule ({
                busid: req.body.busid,
                noOfSeats: req.body.noOfSeats,
                routeId: req.body.routeId,
                runTimes: [
                    {
                        date: new Date(req.body.date),
                        startTime: new Date(req.body.startTime),
                        endTime: new Date(req.body.endTime),
                        startFrom: req.body.startFrom.toUpperCase(),
                        endFrom: req.body.endFrom.toUpperCase(),
                        status: runningBusStatus.sheduled,
                        price: req.body.price,
                        driverName: req.body.driverName.toUpperCase(),
                        driverLicenseNo: req.body.driverLicenseNo,
                        conductorName: req.body.conductorName.toUpperCase(),
                        conductorId: req.body.conductorId,
                    }
                ] 
            })
            await newBusSchedule.save();
            return res.status(200).json(" The bus " + req.body.busNo+ " is scheduled on  " + req.body.date + ". Start at: " + req.body.startTime + ", " +req.body.startFrom+ " - End at: " + req.body.endTime + ", " +req.body.endFrom);
        } else {
            const isScheduled = Bus[0].runTimes.some(runtime =>
                runtime.date.toISOString().split("T")[0] ===
                        new Date(req.body.date).toISOString().split("T")[0] &&
                    new Date(runtime.startTime).getTime() <=
                        new Date(req.body.endTime).getTime() &&
                    new Date(runtime.endTime).getTime() >=
                        new Date(req.body.startTime).getTime()
            );
            if (isScheduled) {
                return res.status(200).json("The bus is aready scheduled on this time on this date");
            }

            const runTime = {
                date: new Date(req.body.date),
                startTime: new Date(req.body.startTime),
                endTime: new Date(req.body.endTime),
                startFrom: req.body.startFrom.toUpperCase(),
                endFrom: req.body.endFrom.toUpperCase(),
                status: runningBusStatus.sheduled,
                price: req.body.price,
                driverName: req.body.driverName.toUpperCase(),
                driverLicenseNo: req.body.driverLicenseNo,
                conductorName: req.body.conductorName.toUpperCase(),
                conductorId: req.body.conductorId,
            }

            Bus[0].runTimes.push(runTime);
            await Bus[0].save();
            return res.status(200).json(" The bus " + req.body.busNo+ " is scheduled on  " + req.body.date + ". Start at: " + req.body.startTime + ", " +req.body.startFrom+ " - End at: " + req.body.endTime + ", " +req.body.endFrom);
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const  viewBOBusdetails = async ( req, res, next ) => {
    try {
        const BusDetails = await BusOperator.findById(req.params.id);
        if(BusDetails.length === 0) return res.status(200).json("No Buses added with this");
        res.status(200).json(BusDetails.busDetails)
        return result;
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const  viewBusSchedules = async ( req, res, next ) => {
    try {
        const busSchedules = await BusSchedule.find({busid: req.params.busid});
        if(busSchedules.length === 0) return res.status(200).json("This bus has not scheduled yet");
        res.status(200).json(busSchedules)
        return result;
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const  viewBusSeatReservations = async ( req, res, next ) => {
    try {
        const reservations = await BusSeatReservation.find({runTimeId: req.params.runTimeId});
        if(reservations.length === 0) return res.status(200).json("This bus has no reservations yet");
        return res.status(200).json(reservations);
    } catch (error) {
        console.log(error)
        next(error)
    }
}