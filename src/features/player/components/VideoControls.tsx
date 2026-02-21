import { useCallback, useRef, useState } from 'react';
import { formatTime } from '../../../utils';
import styles from './VideoControls.module.css';

interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onSeek: (time: number) => void;
}

export function VideoControls({
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onSkipForward,
  onSkipBackward,
  onSeek,
}: VideoControlsProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = progressBarRef.current;
      if (!bar || duration <= 0) return;

      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;
      onSeek(newTime);
    },
    [duration, onSeek]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const bar = progressBarRef.current;
      if (!bar || duration <= 0) return;

      const rect = bar.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, touchX / rect.width));
      const newTime = percentage * duration;
      onSeek(newTime);
    },
    [isDragging, duration, onSeek]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      handleProgressClick(e);
    },
    [isDragging, handleProgressClick]
  );

  return (
    <div className={styles.controls}>
      {/* Progress bar */}
      <div
        ref={progressBarRef}
        className={styles.progressContainer}
        onClick={handleProgressClick}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
          <div
            className={styles.progressThumb}
            style={{ left: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls row */}
      <div className={styles.controlsRow}>
        {/* Time display */}
        <div className={styles.timeDisplay}>
          <span>{formatTime(currentTime)}</span>
          <span className={styles.timeSeparator}>/</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Center controls */}
        <div className={styles.centerControls}>
          <button
            className={styles.skipButton}
            onClick={onSkipBackward}
            aria-label="Rewind 10 seconds"
          >
            <SkipBackIcon />
            <span className={styles.skipLabel}>10</span>
          </button>

          <button
            className={styles.playButton}
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            className={styles.skipButton}
            onClick={onSkipForward}
            aria-label="Forward 10 seconds"
          >
            <SkipForwardIcon />
            <span className={styles.skipLabel}>10</span>
          </button>
        </div>

        {/* Right spacer for balance */}
        <div className={styles.rightSpacer} />
      </div>
    </div>
  );
}

// Icon components
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function SkipBackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>
  );
}

function SkipForwardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
    </svg>
  );
}
