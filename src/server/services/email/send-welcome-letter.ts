import * as eta from 'eta';

import { EmailOptions, sendEmail } from './send';

export type WelcomeLetterOptions = Pick<EmailOptions, 'to'>;

export async function sendWelcomeLetter({ to }: WelcomeLetterOptions) {
  const content = await eta.renderFile('./templates/welcome.html', {
    userName: to,
  })!;
  await sendEmail({
    subject: 'Welcome to Chirpy',
    to,
    type: 'welcome',
    content,
  });
}
