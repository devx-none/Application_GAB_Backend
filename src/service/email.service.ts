import nodemailer from 'nodemailer';
 

// send email for new account
export const sendEmail = async (email: any) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    let info = await transporter.sendMail({
        from: 'Welcome <checker.GAB@gmail.com>',
        to: email,
        subject: " send new account ",
        text: " Test ",
        html: `<b>Email :  ${email}</b>
        <b> password : </b>`,
    });

    console.log("Preview URL: %s", info);


}