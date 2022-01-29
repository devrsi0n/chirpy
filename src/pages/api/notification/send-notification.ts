import { getApiHandler } from '$/server/common/api-handler';
import { sendNotification } from '$/server/services/notification';

const handler = getApiHandler();
handler.get(sendNotification);

export default handler;
