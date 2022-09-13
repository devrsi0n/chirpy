import { getAPIHandler } from '$/server/common/api-handler';
import { revalidateWidgets } from '$/server/services/revalidate/widgets';

const handler = getAPIHandler();
handler.get(revalidateWidgets);

export default handler;
