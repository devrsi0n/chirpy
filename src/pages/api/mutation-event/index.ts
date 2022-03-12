import { getApiHandler } from '$/server/common/api-handler';
import { handleMutationEvent } from '$/server/services/mutation-event/mutation-event';

const handler = getApiHandler();

handler.post(handleMutationEvent);

export default handler;
