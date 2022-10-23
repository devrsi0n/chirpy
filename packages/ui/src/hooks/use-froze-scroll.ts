import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect';

/**
 * Froze body scroll when frozeScroll is true,
 * used in modal and drawer.
 * @param frozeScroll
 */
export function useFrozeBodyScroll(frozeScroll: boolean) {
  useIsomorphicLayoutEffect(() => {
    if (frozeScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  }, [frozeScroll]);
}
