import * as SibApiV3Sdk from '@sendinblue/client';

import { EmailType } from './types';

const sibApi = new SibApiV3Sdk.TransactionalEmailsApi();

sibApi.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.EMAIL_API_KEY);

export interface MailPerson {
  email: string;
  name: string;
}

export interface EmailOptions {
  subject: string;
  to: MailPerson;
  type: EmailType;
  /**
   * Email content, support html
   */
  content: string;
}

export async function sendEmail({ subject, to, type, content }: EmailOptions) {
  console.log('Send email', {
    subject,
    to,
    type,
    content,
  });
  const email = new SibApiV3Sdk.SendSmtpEmail();
  email.subject = subject;
  // We can only send to 1 person as we can't fill multiply parameters with 1 template
  email.to = [to];
  email.sender = senders[type];
  email.htmlContent = content;
  email.tags = [type];
  await sibApi.sendTransacEmail(email);
}

const senders: Record<EmailType, MailPerson> = {
  welcome: {
    name: 'Chirpy',
    email: 'hello@chirpy.dev',
  },
  notification: {
    name: 'Chirpy notification',
    email: 'notification@chirpy.dev',
  },
  'verification-request': {
    name: 'Chirpy verification request',
    email: 'no-reply@chirpy.dev',
  },
};
