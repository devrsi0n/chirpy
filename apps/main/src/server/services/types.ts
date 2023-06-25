import { Page } from '@chirpy-dev/trpc';
import { ResponseError } from '@chirpy-dev/types';

export type PagePayload = Page | ResponseError;
