import { PageByUrlQuery } from '@chirpy/server-graphql/generated/page';
import { ResponseError } from './error.type';

export type GetPagByUrl = PageByUrlQuery['pages'][number] | ResponseError;
