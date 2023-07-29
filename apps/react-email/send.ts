import * as SibApiV3Sdk from '@sendinblue/client';

type EmailType = 'upgradePlan';

const sibApi = new SibApiV3Sdk.TransactionalEmailsApi();

sibApi.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.EMAIL_API_KEY,
);

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
  const email = new SibApiV3Sdk.SendSmtpEmail();
  email.subject = subject;
  // We can only send to 1 person as we can't fill multiply parameters with 1 template
  email.to = [to];
  email.sender = senders[type];
  email.htmlContent = content;
  email.tags = [type];
  // log.debug('Send email', JSON.stringify(email, null, 2));
  await sibApi.sendTransacEmail(email);
}

const senders: Record<EmailType, MailPerson> = {
  upgradePlan: {
    name: 'Chirpy',
    email: 'no-reply@chirpy.dev',
  },
};
