import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (mailOptions, email) => {
    try {
        console.log(process.env.EMAIL_USER)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        transporter.sendMail(mailOptions)
        console.log(`Status update email sent to ${email}`);
        return true
    } catch (error) {
        console.log(error)
    }
}


// export const sendEmail = async (email, businessName, Status) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         })

//         const mailOptions = {
//             from: "NTCBusSeatReservation", // Sender address
//             to: email, // Recipient's email
//             subject: "Bus Operator Registraion Approved",
//             html: `
//                 <p>Dear <b>${businessName} </b>,</p>
//                 <h4>Congratulations!!!</h4>
//                 <p>Your business registration under the id <b> ${businessName} </b> has approved by NTCBusSeatReservation</p>
//                 <p>Now you can add you bus details and get reservations</p>
//             `
//         };

//         transporter.sendMail(mailOptions)
//         console.log(`Status update email sent to ${email}`);
//         return true
//     } catch (error) {
//         console.log(error)
//     }
// }