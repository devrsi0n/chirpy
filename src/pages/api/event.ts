import { apiHandler } from '$/server/common/api-handler';
import { telemetrySessionMiddleware } from '$/server/middlewares/telemetry-session';
import { handleRecordEvent } from '$/server/services/event';

apiHandler.use(telemetrySessionMiddleware);
apiHandler.post(handleRecordEvent);

export default apiHandler;
