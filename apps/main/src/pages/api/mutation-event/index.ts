import { getAPIHandler } from '$/server/common/api-handler';
import { handleMutationEvent } from '$/server/services/mutation-event/mutation-event';

const handler = getAPIHandler();

handler.post(handleMutationEvent);

export default handler;
