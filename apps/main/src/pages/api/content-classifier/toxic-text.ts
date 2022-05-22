import { getApiHandler } from '$/server/common/api-handler';
import { checkToxicText } from '$/server/services/content-classifier/toxic-text';

const handler = getApiHandler();
handler.get(checkToxicText);

export default handler;
