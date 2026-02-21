import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VideoItem } from '../../../types';
import styles from './AutoplayCountdown.module.css';

interface AutoplayCountdownProps {
  nextVideo: VideoItem | null;
  isVisible: boolean;
  countdownSeconds?: number;
  onPlayNext: () => void;
  onCancel: () => void;
}

export function AutoplayCountdown({
  nextVideo,
  isVisible,
  countdownSeconds = 5,
  onPlayNext,
  onCancel,
}: AutoplayCountdownProps) {
  const [countdown, setCountdown] = useState(countdownSeconds);

  // Reset countdown when visibility changes
  useEffect(() => {
    if (isVisible) {
      setCountdown(countdownSeconds);
    }
  }, [isVisible, countdownSeconds]);

  // Countdown timer
  useEffect(() => {
    if (!isVisible || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onPlayNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, countdown, onPlayNext]);

  const handleCancel = useCallback(() => {
    setCountdown(0);
    onCancel();
  }, [onCancel]);

  const handlePlayNow = useCallback(() => {
    setCountdown(0);
    onPlayNext();
  }, [onPlayNext]);

  if (!nextVideo) return null;

  return (
    <AnimatePresence>
      {isVisible && countdown > 0 && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.content}>
            <div className={styles.header}>
              <span className={styles.label}>Up next</span>
              <div className={styles.countdownCircle}>
                <svg viewBox="0 0 36 36" className={styles.circleSvg}>
                  <circle
                    className={styles.circleBackground}
                    cx="18"
                    cy="18"
                    r="16"
                  />
                  <motion.circle
                    className={styles.circleProgress}
                    cx="18"
                    cy="18"
                    r="16"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{
                      strokeDashoffset: 100.53 * (1 - countdown / countdownSeconds),
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
                <span className={styles.countdownNumber}>{countdown}</span>
              </div>
            </div>

            <div className={styles.nextVideo}>
              <div className={styles.thumbnailContainer}>
                <img
                  src={nextVideo.thumbnail}
                  alt={nextVideo.title}
                  className={styles.thumbnail}
                />
              </div>
              <div className={styles.videoInfo}>
                <h3 className={styles.title}>{nextVideo.title}</h3>
                <span className={styles.category}>{nextVideo.category}</span>
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
              <button className={styles.playButton} onClick={handlePlayNow}>
                Play now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
