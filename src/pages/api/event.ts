import { getApiHandler } from '$/server/common/api-handler';
import { telemetrySessionMiddleware } from '$/server/middlewares/telemetry-session';
import { handleRecordEvent } from '$/server/services/event';

const handler = getApiHandler();
handler.use(telemetrySessionMiddleware);
handler.post(handleRecordEvent);

export default handler;
