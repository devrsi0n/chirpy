import * as eta from 'eta';
import path from 'path';

import { EmailOptions, sendEmail } from './send';
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

export type SendVerificationRequestOptions = SendEmailOptions & {
  url: string;
};
export async function sendVerificationRequest({ to, url }: SendVerificationRequestOptions) {
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
  const content = await eta.renderFile(
    // eslint-disable-next-line unicorn/prefer-module
    path.resolve(process.cwd(), `templates/${type}.html`),
    templateParams,
  )!;
  await sendEmail({
    subject,
    to,
    type,
    content,
  });
}
