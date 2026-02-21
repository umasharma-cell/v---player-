import { useRef, useCallback, type ReactNode } from 'react';
import { motion, useAnimation, useDragControls, type PanInfo } from 'framer-motion';
import styles from './BottomSheet.module.css';

interface BottomSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: string;
}

const SHEET_HEIGHT = 60; // percentage of viewport
const DRAG_THRESHOLD = 50; // pixels to trigger close
const VELOCITY_THRESHOLD = 500; // velocity to trigger close

export function BottomSheet({ isOpen, onOpenChange, children, title }: BottomSheetProps) {
  const controls = useAnimation();
  const dragControls = useDragControls();
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const shouldClose =
        info.offset.y > DRAG_THRESHOLD ||
        info.velocity.y > VELOCITY_THRESHOLD;

      if (shouldClose) {
        onOpenChange(false);
      } else {
        controls.start({ y: 0 });
      }
    },
    [controls, onOpenChange]
  );

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleBackdropClick = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleBackdropClick}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      />

      {/* Sheet */}
      <motion.div
        ref={sheetRef}
        className={styles.sheet}
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? 0 : '100%' }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
        }}
        drag="y"
        dragControls={dragControls}
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ height: `${SHEET_HEIGHT}vh` }}
      >
        {/* Handle */}
        <div className={styles.handleContainer}>
          <div className={styles.handle} />
        </div>

        {/* Header */}
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Content */}
        <div className={styles.content}>
          {children}
        </div>
      </motion.div>
    </>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}
