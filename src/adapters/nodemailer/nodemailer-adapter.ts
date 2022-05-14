import { MailAdpater, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "25c40e63887b1b",
    pass: "bed4ff4ef103f9"
  }
});


export class NodemailerMailAdpater implements MailAdpater {
  async sendMail({subject, body }: SendMailData){
    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Fernanda Bernardes <klaupher@gmail.com>',
        subject,
        html: body,
      })
  };
}