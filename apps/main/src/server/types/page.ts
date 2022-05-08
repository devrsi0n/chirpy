import { PageByUrlQuery } from '../graphql/generated/page';
import { ResponseError } from './error';

export type GetPagByUrl = PageByUrlQuery['pages'][number] | ResponseError;
