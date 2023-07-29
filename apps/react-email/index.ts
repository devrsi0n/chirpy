import { render } from '@react-email/components';

import {
  getSubject,
  UpgradePlan,
  UpgradePlanProps,
} from './emails/upgrade-plan';
import { EmailOptions, sendEmail } from './send';

export async function sendUpgradePlanEmail(
  props: Pick<EmailOptions, 'to'> & Pick<UpgradePlanProps, 'plan'>,
) {
  return sendEmail({
    to: props.to,
    content: render(
      UpgradePlan({
        plan: props.plan,
        name: props.to.name,
      }),
    ),
    subject: getSubject(props.plan),
    type: 'upgradePlan',
  });
}
