import BusOperator from "../models/BusOperator.js";
import BusRoute from "../models/BusRoutesModel.js";
import { BusApprovedMail, BusOperatorApprovedMail } from "../utils/emailTemplates.js";
import { busOperatorStatus } from "../utils/publicEnum.js";
import { sendEmail } from "./MailController.js";

export const getBusOperatorsForApproval = async (req, res, next) => {
    try {
        const waitingUsers = await BusOperator.find(
            {status:busOperatorStatus.Pending}
        ).select('businessName email location NoOfBusses role createdAt');
        if(!waitingUsers) return res.status(200).json("No pending Bus Operators");
        res.status(200).json(waitingUsers)
    } catch (error) {
        console.log(error)
    }
}

export const getBusDetailsForApproval = async (req, res, next) => {
    try {
        const wailtingBusDetails = await BusOperator.aggregate([
            {
                $match: {
                    "status": 2,
                    "busDetails.Status": 1
                }
            },
            {
                $project: {
                    businessName: 1, 
                    _id: 1,          
                    busDetails: {
                        $filter: {
                            input: "$busDetails", 
                            as: "bus",
                            cond: { $eq: ["$$bus.Status", 1] }
                        }
                    }
                }
            }
        ]);
        if(wailtingBusDetails.length === 0) return res.status(200).json("No pending Bus details by bus operators");
        res.status(200).json(wailtingBusDetails)
        return result;
    } catch (error) {
        console.log(error)
    }
}

export const ApproveOrRejectBusOperator = async (req, res, next) => {
    try {
        const status = req.params.status
        const updatedBusOperator  = await BusOperator.findByIdAndUpdate(
            req.params.id, 
            {$set: {status: status}}, 
            {new:true}
        );
        if(!updatedBusOperator) return res.status(200).json("Bus Operator not found");

        const template = BusOperatorApprovedMail(updatedBusOperator.email, updatedBusOperator.businessName, updatedBusOperator.id, updatedBusOperator.status)
        if(sendEmail(template, updatedBusOperator.email)) return res.status(200).json({message: "Bus Operator status updated successfully"});
    } catch (error) {
        console.log(error)
    }
}

export const ApproveOrRejectBusDetails = async (req, res, next) => {
    try {
        const status = req.params.status
        const updatedBusDetail = await BusOperator.findOneAndUpdate(
            { _id: req.params.id, "busDetails.busNo": req.params.busNo}, 
            { $set: { "busDetails.$.Status": status } }, 
            { new: true } 
        );

        if (!updatedBusDetail) return res.status(404).json("The given bus detail is not found");
        const template = BusApprovedMail(updatedBusDetail.email, updatedBusDetail.businessName, req.params.busNo, Number(status))
        if(sendEmail(template, updatedBusDetail.email)) return res.status(200).json({message: "Bus detail status updated successfully"});
    
    } catch (error) {
        console.log(error)
    }
}

export const getRegisteredBusOperators = async (req, res, next) => {
    try {
        const waitingUsers = await BusOperator.find(
            {status:busOperatorStatus.Approved}
        ).select('businessName email location NoOfBusses role busDetails createdAt');
        if(!waitingUsers) return res.status(200).json("No Registered Bus Operators");
        res.status(200).json(waitingUsers)
    } catch (error) {
        console.log(error)
    }
}

export const getRejectedBusOperators = async (req, res, next) => {
    try {
        const waitingUsers = await BusOperator.find(
            {status:busOperatorStatus.Rejected}
        ).select('businessName email location NoOfBusses role busDetails createdAt');
        if(!waitingUsers) return res.status(200).json("No Registered Bus Operators");
        res.status(200).json(waitingUsers)
    } catch (error) {
        console.log(error)
    }
}

export const addBusRoutes = async (req, res, next) => {
    try {
        const newRoute = new BusRoute({
            routeId: req.body.routeId,
            routeStart: req.body.routeStart.toUpperCase(),
            routeEnd: req.body.routeEnd.toUpperCase(),
            route: req.body.routeStart.toUpperCase() + ' - ' + req.body.routeEnd.toUpperCase(),
            AvailableBusses: []
        })
        let route = await newRoute.save()
        route.id ? res.status(200).json("New route " + route.route + " added Successfully") : res.status(500).json("route adding Failed.")
        
    } catch (error) {
        error.code === 11000 ? res.status(409).json("This route is already exists.") : next(error);
    }
}
        
