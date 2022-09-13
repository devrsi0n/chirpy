import { getAPIHandler } from '$/server/common/api-handler';
import { registerDevice } from '$/server/services/notification/register';

const handler = getAPIHandler();
handler.post(registerDevice);

export default handler;
