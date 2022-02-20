import { getApiHandler } from '$/server/common/api-handler';
import { getCommentData } from '$/server/services/comment';

const handler = getApiHandler();
handler.post(getCommentData);

export default handler;
