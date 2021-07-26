import Cors from 'cors';

import { apiHandler } from '$/server/common/api-handler';
import { handleGetPage } from '$/server/services/page';

const cors = Cors({
  // Only allow requests with GET, POST and OPTIONS
  methods: ['GET', 'POST', 'OPTIONS'],
});

apiHandler.use(cors);
apiHandler.get(handleGetPage);

export default apiHandler;
