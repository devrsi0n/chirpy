import { buildSendMail } from 'mailing-core';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  pool: true,
  host: 'smtp.example.com',
  port: 465,
  secure: true, // use TLS
  auth: {
    user: 'username',
    pass: 'password',
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: 'replace@me.with.your.com',
  configPath: './mailing.config.json',
});

export default sendMail;
