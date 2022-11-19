import { MotionProps } from 'framer-motion';

export const easeInOut: MotionProps = {
  transition: { duration: 0.15 },
  initial: { opacity: 0.5, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0.5, scale: 0.95 },
};
export const easeInOutOpacity: MotionProps = {
  transition: { duration: 0.15 },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const expanded: MotionProps = {
  // transition: { duration: 0.25 },
  initial: { opacity: 0, y: -40, height: 0 },
  animate: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: {
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
        delay: 0.15,
      },
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    height: 0,
    transition: {
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
      },
    },
  },
};
