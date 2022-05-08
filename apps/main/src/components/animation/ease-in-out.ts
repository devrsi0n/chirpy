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
