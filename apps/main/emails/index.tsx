import { buildSendMail, ComponentMail } from 'mailing-core';
import nodemailer from 'nodemailer';
// @ts-ignore
import Transport from 'nodemailer-sendinblue-transport';
import React from 'react';

import { ExceededUsageProps } from './ExceededUsage';
import ExceededUsage from './ExceededUsage';

const transport = nodemailer.createTransport(
  new Transport({
    apiKey: process.env.EMAIL_API_KEY,
  }),
);

const sendMail = buildSendMail({
  transport,
  defaultFrom: 'Chirpy notification <no-reply@chirpy.dev>',
  configPath: './mailing.config.json',
});
export default sendMail;

export type SendUsageExceedEmailArgs = Required<Pick<ComponentMail, 'to'>> &
  ExceededUsageProps;

export async function sendUsageExceedEmail({
  to,
  ...exceededUsageProps
}: SendUsageExceedEmailArgs) {
  await sendMail({
    subject: `Your page view usage has exceeded the limit`,
    to,
    component: <ExceededUsage {...exceededUsageProps} />,
  });
}
