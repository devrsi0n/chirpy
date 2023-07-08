import { getPage, PAGE_BY_URL_INPUT } from '../services/page/get-page';
import { publicProcedure, router } from '../trpc-server';

export const pageRouter = router({
  byUrl: publicProcedure.input(PAGE_BY_URL_INPUT).query(async ({ input }) => {
    return getPage(input);
  }),
});
