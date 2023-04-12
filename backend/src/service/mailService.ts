import nodemailer from 'nodemailer';
import { MailInterface } from '../utils'
import { APILogger } from "../logger/api.logger";

const logger = new APILogger();
export default class MailService {
    private static instance: MailService;
    private transporter: nodemailer.Transporter;

    private constructor() {}
    //INSTANCE CREATE FOR MAIL
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }
   
    //CREATE A CONNECTION FOR LIVE
    async createConnection() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_TLS === 'yes' ? true : false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        } as nodemailer.TransportOptions);
    }
    //SEND MAIL
    async sendMail(
        requestId: string | number | string[],
        options: MailInterface
    ) {
        return await this.transporter
            .sendMail({ 
                from: `${process.env.SMTP_SENDER || options.from}`,
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                text: options.text,
                html: options.html,
            })
            .then((info) => {
                logger.info("info", `${requestId} - Mail sent successfully!!`);
                return info;
            });
    }
    //VERIFY CONNECTION
    async verifyConnection() {
        return this.transporter.verify();
    }
    //CREATE TRANSPORTER
    getTransporter() {
        return this.transporter;
    }
}