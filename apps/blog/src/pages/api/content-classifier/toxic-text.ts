import { getAPIHandler } from '$/server/common/api-handler';
import { checkToxicText } from '$/server/services/content-classifier/toxic-text';

const handler = getAPIHandler();
handler.get(checkToxicText);

export default handler;
