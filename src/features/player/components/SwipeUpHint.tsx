import { motion } from 'framer-motion';
import styles from './SwipeUpHint.module.css';

interface SwipeUpHintProps {
  onClick: () => void;
  label?: string;
}

export function SwipeUpHint({ onClick, label = 'Related videos' }: SwipeUpHintProps) {
  return (
    <motion.button
      className={styles.hint}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={styles.iconContainer}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
      >
        <ChevronUpIcon />
      </motion.div>
      <span className={styles.label}>{label}</span>
    </motion.button>
  );
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
    </svg>
  );
}
