import { NextApiResponse } from 'next';

import { getAdminApollo } from '$server/common/admin-apollo';
import { InsertOneEventDocument } from '$server/graphql/generated/event';
import { EventRequest } from '$server/types/event';
import { createToken } from '$server/utilities/create-token';

import { EventResponseBody } from '$shared/types/event';

export async function handleRecordEvent(
  req: EventRequest,
  res: NextApiResponse<EventResponseBody | string>,
) {
  const { type, params, url, referrer } = req.body.event;
  const { sessionId } = req.session!;
  const adminApollo = getAdminApollo();

  const { data } = await adminApollo.mutate({
    mutation: InsertOneEventDocument,
    variables: {
      type,
      params,
      url,
      referrer,
      sessionId,
    },
  });
  if (!data?.insertOneEvent?.id) {
    return res.status(500).send(`Sever error, create event failed`);
  }

  res.json({ cache: createToken(req.session!, { maxAge: '1d' }) });
}
