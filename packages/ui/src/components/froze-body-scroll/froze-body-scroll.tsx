import * as React from 'react';

import { useFrozeBodyScroll } from '../../hooks/use-froze-scroll';

export type FrozeBodyScrollProps = {
  children?: React.ReactNode;
  frozeScroll: boolean;
};

/**
 * Froze body scroll when frozeScroll is true,
 * used in modal and drawer.
 */
export function FrozeBodyScroll({
  children,
  frozeScroll,
}: FrozeBodyScrollProps): JSX.Element {
  useFrozeBodyScroll(frozeScroll);
  return <>{children}</>;
}
