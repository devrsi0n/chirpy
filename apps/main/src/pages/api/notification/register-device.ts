import { getApiHandler } from '$/server/common/api-handler';
import { registerDevice } from '$/server/services/notification/register';

const handler = getApiHandler();
handler.post(registerDevice);

export default handler;
