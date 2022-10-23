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

interface ModalState {
  viewport: number;
}

class Modal extends React.Component<ModalProps, ModalState> {
  node: React.RefObject<HTMLDivElement> = React.createRef();
  state = {
    viewport: DEFAULT_WIDTH,
  };

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keyup', this.handleKeyup);
    window.addEventListener('resize', this.handleResize, false);
    this.handleResize();
  }

  componentWillUnmount() {
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('height');

    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keyup', this.handleKeyup);
    window.removeEventListener('resize', this.handleResize, false);
  }

  handleClickOutside = (e: MouseEvent) => {
    // @ts-ignore
    if (this.node.current?.contains(e.target)) {
      return;
    }

    this.close();
  };

  handleKeyup = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      this.close();
    }
  };

  handleResize = () => {
    this.setState({ viewport: window.innerWidth });
  };

  close() {
    this.props.router.push(
      `/${encodeURIComponent(this.props.site.domain)}${
        this.props.location.search
      }`,
    );
  }

  /**
   * @description
   * Decide whether to set max-width, and if so, to what.
   * If no max-width is available, set width instead to min-content such that we can rely on widths set on th.
   * On >md, we use the same behaviour as before: set width to 800 pixels.
   * Note that When a max-width comes from the parent component, we rely on that *always*.
   */
  getStyle() {
    const { maxWidth } = this.props;
    const { viewport } = this.state;
    const styleObject: any = {};
    if (maxWidth) {
      styleObject.maxWidth = maxWidth;
    } else {
      styleObject.width = viewport <= MD_WIDTH ? 'min-content' : '860px';
    }
    return styleObject;
  }

  render() {
    return createPortal(
      <div className="modal is-open" onClick={this.props.onClick}>
        <div className="modal__overlay">
          <button className="modal__close"></button>
          <div
            ref={this.node}
            className="modal__container dark:bg-gray-800"
            style={this.getStyle()}
          >
            {this.props.children}
          </div>
        </div>
      </div>,
      document.querySelector('#modal_root')!,
    );
  }
}

export default Modal;
