import { PageByUrlQuery } from '@chirpy/server-graphql/generated/page';
import { ResponseError } from '@chirpy/types';

export type GetPagByUrl = PageByUrlQuery['pages'][number] | ResponseError;
