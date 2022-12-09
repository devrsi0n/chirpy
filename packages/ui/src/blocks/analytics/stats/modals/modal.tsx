// @ts-nocheck
import { NextRouter } from 'next/router';
import React from 'react';
import { createPortal } from 'react-dom';

import { Site } from '../../type';

// This corresponds to the 'md' breakpoint on TailwindCSS.
const MD_WIDTH = 768;
// We assume that the dashboard is by default opened on a desktop. This is also a fall-back for when, for any reason, the width is not ascertained.
const DEFAULT_WIDTH = 1080;

interface ModalProps {
  router: NextRouter;
  site: Site;
  onClick: () => void;
  maxWidth: number;
}

function Modal({ router, site, onClick, maxWidth, children }: ModalProps) {
  const [viewport, setViewport] = useState(DEFAULT_WIDTH);
  const node = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keyup', handleKeyup);
    window.addEventListener('resize', handleResize, false);
    handleResize();

    return () => {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('height');

      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keyup', handleKeyup);
      window.removeEventListener('resize', handleResize, false);
    };
  }, []);

  function handleClickOutside(e: MouseEvent) {
    // @ts-ignore
    if (node.current?.contains(e.target)) {
      return;
    }

    close();
  }

  function handleKeyup(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      close();
    }
  }

  function handleResize() {
    setViewport(window.innerWidth);
  }

  function close() {
    router.push(`/${encodeURIComponent(site.domain)}${location.search}`);
  }

  /**
   * Decide whether to set max-width, and if so, to what.
   * If no max-width is available, set width instead to min-content such that we can rely on widths set on th.
   * On >md, we use the same behaviour as before: set width to 800 pixels.
   * Note that When a max-width comes from the parent component, we rely on that *always*.
   */
  function getStyle() {
    const styleObject: any = {};
    if (maxWidth) {
      styleObject.maxWidth = maxWidth;
    } else {
      styleObject.width = viewport <= MD_WIDTH ? 'min-content' : '860px';
    }
    return styleObject;
  }

  return createPortal(
    <div className="modal is-open" onClick={onClick}>
      <div className="modal__overlay">
        <button className="modal__close"></button>
        <div
          ref={node}
          className="modal__container dark:bg-gray-800"
          style={getStyle()}
        >
          {children}
        </div>
      </div>
    </div>,
    document.querySelector('#modal_root')!,
  );
}

export default Modal;
