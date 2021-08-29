import { Descendant } from 'slate';
import { CustomElement, CustomText } from 'types/slate';

export type RTEValue = Descendant[];
export type InlineFormat = keyof Omit<CustomText, 'text'>;
export type BlockFormat = CustomElement['type'];
export type Icon = InlineFormat;
