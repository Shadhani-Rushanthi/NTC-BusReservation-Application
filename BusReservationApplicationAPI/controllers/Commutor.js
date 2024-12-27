import express from 'express'
import BusSchedule from '../models/BusScheduleModel.js'

export const searchBusses = async ( req, res, next ) => {
    try {
        const date =  new Date(req.body.date)
        const start  = req.body.startFrom.toUpperCase()
        const end  = req.body.endFrom.toUpperCase()

        const availableBuses = await BusSchedule.find({
            "runTimes.date": date,
            "runTimes.startFrom": start,
            "runTimes.endFrom": end
        }, {
            "busid": 1, 
            "routeId": 1,
            "noOfSeats": 1,
            "runTimes.$": 1 
        });
        if(availableBuses.length === 0) return res.status(200).json("No busses availble");
        return res.status(200).json(availableBuses);
        
    } catch (error) {
        
    }
}