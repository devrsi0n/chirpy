import Cors from 'cors';
import { withAxiom } from 'next-axiom';

import { getApiHandler } from '$/server/common/api-handler';
import { getPage } from '$/server/services/page';

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
});
const handler = getApiHandler();
handler.use(cors);
handler.get(getPage);

export default withAxiom(handler);
