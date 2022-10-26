import { PageByUrlQuery } from '@chirpy-dev/graphql';
import { ResponseError } from './error';

export type GetPagByUrl = PageByUrlQuery['pages'][number] | ResponseError;
