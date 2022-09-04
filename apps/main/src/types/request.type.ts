import { OperationContext } from 'urql';

export type Refetch = (opts?: Partial<OperationContext> | undefined) => void;
