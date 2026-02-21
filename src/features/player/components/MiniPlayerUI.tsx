import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { VideoItem } from '../../../types';
import styles from './MiniPlayerUI.module.css';

interface MiniPlayerUIProps {
  video: VideoItem;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onRestore: () => void;
  onClose: () => void;
  videoElement: ReactNode;
}

export function MiniPlayerUI({
  video,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onRestore,
  onClose,
  videoElement,
}: MiniPlayerUIProps) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTogglePlay();
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onClick={onRestore}
    >
      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={styles.content}>
        {/* Video thumbnail */}
        <div className={styles.videoContainer}>
          {videoElement}
        </div>

        {/* Video info */}
        <div className={styles.info}>
          <h3 className={styles.title}>{video.title}</h3>
          <span className={styles.category}>{video.category}</span>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button
            className={styles.playButton}
            onClick={handlePlayClick}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            className={styles.closeButton}
            onClick={handleCloseClick}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}
