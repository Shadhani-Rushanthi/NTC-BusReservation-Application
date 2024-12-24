import BusOperator from "../models/BusOperator.js";
import { BusOperatorApprovedMail } from "../utils/emailTemplates.js";
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

export const ApproveBusOperator = async (req, res, next) => {
    try {
        const status = req.params.status
        const updatedBusOperator  = await BusOperator.findByIdAndUpdate(req.params.id, {$set: {status: status}}, {new:true});
        if(!updatedBusOperator) return res.status(200).json({ message: "Bus Operator not found" });

        const template = BusOperatorApprovedMail(updatedBusOperator.email, updatedBusOperator.businessName, updatedBusOperator.id, updatedBusOperator.status)
        if(sendEmail(template, updatedBusOperator.email)) return res.status(200).json({message: "Bus Operator status updated successfully"});
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