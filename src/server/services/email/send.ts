import SibApiV3Sdk from '@sendinblue/client';

const sibApi = new SibApiV3Sdk.TransactionalEmailsApi();

sibApi.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.EMAIL_API_KEY);

export interface MailPerson {
  email: string;
  name: string;
}

export type EmailType = 'welcome' | 'notification';

export interface EmailOptions {
  subject: string;
  to: MailPerson[];
  type: EmailType;
  content: string;
}

export async function sendEmail({ subject, to, type, content }: EmailOptions) {
  const email = new SibApiV3Sdk.SendSmtpEmail();
  email.subject = subject;
  email.to = to;
  email.sender = senders[type];
  email.htmlContent = content;
  email.tags = [type];
  await sibApi.sendTransacEmail(email);
}

const senders: Record<EmailType, MailPerson> = {
  welcome: {
    name: 'Chirpy hello',
    email: 'hello@chirpy.dev',
  },
  notification: {
    name: 'Chirpy notification',
    email: 'notification@chirpy.dev',
  },
};
