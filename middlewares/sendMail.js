import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const CLIENT_ID = '1012569440488-a1rbmqqcce88r8m602ntbe27inobaclp.apps.googleusercontent.com'
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04sJ-Lu4U1jBrCgYIARAAGAQSNwF-L9IrpYA6M2C7HEo6o9Z791LnGfljKvryc8UoDRr9h6wgfzsG8jHrKgubjO3_FgjcsWaUj0k";

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const accessToken = await oAuth2Client.getAccessToken();
       export const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user:'priyanshunew040703@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })