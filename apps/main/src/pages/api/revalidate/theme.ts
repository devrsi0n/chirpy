import { getAPIHandler } from '$/server/common/api-handler';
import { revalidateTheme } from '$/server/services/revalidate/theme';

const handler = getAPIHandler();
handler.get(revalidateTheme);

export default handler;
