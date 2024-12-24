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
                <p>Now you can add you bus details and get reservations</p>
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