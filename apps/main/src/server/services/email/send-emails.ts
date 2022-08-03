import * as eta from 'eta';

import { EmailOptions, sendEmail } from './send';
import notificationTemplate from './templates/notification.html';
import verificationRequest from './templates/verification-request.html';
import welcomeTemplate from './templates/welcome.html';
import { EmailType } from './types';

export type SendEmailOptions = Pick<SendEmailWithTemplateOptions, 'to'>;

export async function sendWelcomeLetter({ to }: SendEmailOptions) {
  await sendEmailWithTemplate({
    to,
    type: 'welcome',
    subject: 'Welcome to Chirpy',
    templateParams: {
      userName: to.name,
    },
  });
}

export type SendVerificationEmailOptions = SendEmailOptions & {
  url: string;
};
export async function sendVerificationEmail({
  to,
  url,
}: SendVerificationEmailOptions) {
  await sendEmailWithTemplate({
    to,
    type: 'verification-request',
    subject: 'Chirpy verification request',
    templateParams: {
      url,
      email: to.email,
    },
  });
}

export type SendNotificationEmailOptions = SendEmailOptions & {
  url: string;
  title: string;
  body: string;
  userName: string;
};
export async function sendNotificationEmail({
  to,
  url,
  title,
  body,
  userName,
}: SendNotificationEmailOptions) {
  await sendEmailWithTemplate({
    to,
    type: 'notification',
    subject: 'Chirpy notifications',
    templateParams: {
      url,
      email: to.email,
      title,
      body,
      userName,
    },
  });
}

export type SendEmailWithTemplateOptions = Pick<EmailOptions, 'to'> & {
  type: EmailType;
  subject: string;
  templateParams: Record<string, string>;
};

async function sendEmailWithTemplate({
  to,
  type,
  subject,
  templateParams,
}: SendEmailWithTemplateOptions) {
  const content = await eta.render(TEMPLATE_MAP[type], templateParams);
  if (!content) {
    throw new Error(`Can't find template for ${type}`);
  }
  await sendEmail({
    subject,
    to,
    type,
    content,
  });
}

const TEMPLATE_MAP: Record<EmailType, string> = {
  welcome: welcomeTemplate,
  'verification-request': verificationRequest,
  notification: notificationTemplate,
};
