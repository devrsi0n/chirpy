import Cors from 'cors';

import { getAPIHandler } from '$/server/common/api-handler';
import { getPage } from '$/server/services/page';

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
});
const handler = getAPIHandler();
handler.use(cors);
handler.get(getPage);

export default handler;
