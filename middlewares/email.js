import {transport} from './sendMail.js';

export const SendVerificationEmail = async (email, verifcationCode) => {
    try {
        const mailOptions = {
                    from: 'Priyanshu <priyanshunew040703@gmail.com>',
                    to: email,
                    subject: 'Verify your email',
                    text: 'Verify your email',
                    html: `
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; }
                            .container { padding: 20px; background-color: #f4f4f4; }
                            .content { background-color: #fff; padding: 20px; border-radius: 5px; }
                            h1 { color: #333; }
                            p { font-size: 16px; color: #666; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="content">
                                <h1>Hi!</h1>
                                <p>your verifaction code is ${verifcationCode}</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `
                }
                const response = await transport.sendMail(mailOptions)
                return response;
    } catch (error) {
        console.log("error in sending email", error);
        
    }
}