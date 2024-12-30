import { busOperatorStatus } from "./publicEnum.js";

export const BusOperatorApprovedMail = (email, businessName, id, status) =>{
    try {
        var content = ''
        if(status === busOperatorStatus.Approved){
            content =`
                <p>Dear <b>${businessName} </b>,</p>
                <h4>Congratulations!!!</h4>
                <p>The request to register your business under the registration id <b> ${id} </b> has approved by NTCBusSeatReservation</p>
                <p>Now you can add you bus details and get reservations</p>
            `
        } else if(status === busOperatorStatus.Rejected) {
            content =`
                <p>Dear <b>${businessName} </b>,</p>
                <h4>We are Sorry!!!</h4>
                <p>The request to register your business under the registration id <b> ${id} </b> has rejected by NTCBusSeatReservation</p>
                <p>Please contact NTC for more details</p>
            `
        }

        const mailOptions = {
            from: "NTCBusSeatReservation", 
            to: email, 
            subject: "Bus Operator Registraion Approval",
            html: content
        };

        return mailOptions
    } catch (error) {
        console.log(error)
    }
}


export const BusApprovedMail = (email, businessName, busNo, status) =>{
    try {
        var content = ''
        if(status === busOperatorStatus.Approved){
            content =`
                <p>Dear <b>${businessName} </b>,</p>
                <h4>Congratulations!!!</h4>
                <p>The request to add the bus <b>${busNo}</b> to your company has approved by NTCBusSeatReservation</p>
                <p>Now you can  set bus time table and get seat reservations for the bus ${busNo}</p>
            `
        } else if(status === busOperatorStatus.Rejected) {
            content =`
                <p>Dear <b>${businessName} </b>,</p>
                <h4>We are Sorry!!!</h4>
                <<p>The request to add the bus <b>${busNo}</b> to your company has rejected by NTCBusSeatReservation</p>
                <p>Please contact NTC for more details</p>
            `
        }

        const mailOptions = {
            from: "NTCBusSeatReservation", 
            to: email, 
            subject: "Bus details Registraion Approval",
            html: content
        };

        return mailOptions
    } catch (error) {
        console.log(error)
    }
}


export const BusReservationMail = ( user, schedule, busNo) =>{
    try {
        var content =`
            <p>Dear <b>${user.fname} ${user.lname}  </b>,</p>
            <h4>Your reservation on bus <b>${busNo}</b> has been confirmed</h4>
            <h4>Start at <b>${schedule[0].startTime.toString()}</b> from  <b>${schedule[0].startFrom}</b></h4>
            <h4>Start at <b>${schedule[0].endTime.toString()}</b> from  <b>${schedule[0].endFrom}</b></h4>
        `

        const mailOptions = {
            from: "NTCBusSeatReservation", 
            to: user.email, 
            subject: "Bus seat reservation",
            html: content
        };

        return mailOptions
    } catch (error) {
        console.log(error)
    }
}