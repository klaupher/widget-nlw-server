export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailAdpater {
  sendMail: (data: SendMailData) => Promise<void>;
}