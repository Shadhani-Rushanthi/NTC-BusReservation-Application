import Admin from "../models/AdminModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { busOperatorStatus, userRoles } from "../utils/publicEnum.js";
import BusOperator from "../models/BusOperator.js";
import Commutor from "../models/Commutor.js";

export const adminRegister = async (req, res, next ) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new Admin({
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            role: userRoles.Admin
        })
        let user = await newUser.save()
        user.id ? res.status(200).json(user.id + " Admin created Successfully") : res.status(500).json("Registration Failed.")
    } catch (error) {
        error.code === 11000 ? res.status(409).json("Admin email already exists.") : next(error); 
    }
}

export const busOperatorRegister = async (req, res, next ) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new BusOperator({
            businessName: req.body.businessName,
            email: req.body.email,
            password: hash,
            status: busOperatorStatus.Pending,
            location: req.body.location,
            NoOfBusses: req.body.NoOfBusses,
            role: userRoles.BusOperator,
            busDetails: []
        })
        let user = await newUser.save()
        user.id ? res.status(200).json("The Business Id is " + user.id + ". The Business " + req.body.businessName+" waiting for the approval. You will get an Email when approved") : res.status(500).json("Registration Failed.")
    } catch (error) {
        error.code === 11000 ? res.status(409).json("Business name already exists.") : next(error); 
    }
}

export const commuterRegister = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new Commutor({
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: userRoles.Commutor
        })
        let user = await newUser.save()
        user.id ? res.status(200).json(user.id + " Commutor created Successfully") : res.status(500).json("Registration Failed.")
    } catch (error) {
        error.code === 11000 ? res.status(409).json("Commutor email already exists.") : next(error); 
    }
}

export const adminLogin = async (req, res, next)=>{
    try {
        const user = await Admin.findOne({email:req.params.email})
        if(!user) return res.status(200).json("Invalid User");

        const ispwdCorrect = await bcrypt.compare(req.params.password, user.password)
        if(!ispwdCorrect) return res.status(200).json("Incorrect Password");
       
        // const token = jwt.sign({ id:user._id }, process.env.JWT);
        const token = jwt.sign({ id:user.id, role: user.role[0], email: user.email }, process.env.JWT,{ expiresIn: '600s' });
        const {_id, password, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {httpOnly:true}).status(200).json({...otherDetails, token: token,})
    } catch (error) {
        next(error)
    }
}

export const commutorLogin = async (req, res, next)=>{
    try {
        const user = await Commutor.findOne({email:req.params.email})
        if(!user) return res.status(200).json("Invalid User");

        const ispwdCorrect = await bcrypt.compare(req.params.password, user.password)
        if(!ispwdCorrect) return res.status(200).json("Incorrect Password");
       
        // const token = jwt.sign({ id:user._id }, process.env.JWT);
        const token = jwt.sign({ id:user.id, role: user.role[0], email: user.email, fname:user.firstName, lname: user.firstName }, process.env.JWT,{ expiresIn: '600s' });
        const {_id, password, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {httpOnly:true}).status(200).json({...otherDetails, token: token,})
    } catch (error) {
        next(error)
    }
}


export const busOperatorLogin = async (req, res, next)=>{
    try {
        const user = await BusOperator.findOne({email:req.params.email})
        if(!user) return res.status(200).json("Invalid User");

        const ispwdCorrect = await bcrypt.compare(req.params.password, user.password)
        if(!ispwdCorrect) return res.status(200).json("Incorrect Password");
       
        // const token = jwt.sign({ id:user._id }, process.env.JWT);
        const token = jwt.sign({ id:user.id, role: user.role[0], email: user.email }, process.env.JWT,{ expiresIn: '600s' });
        const {_id, password, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {httpOnly:true}).status(200).json({...otherDetails, token: token,})
    } catch (error) {
        next(error)
    }
}