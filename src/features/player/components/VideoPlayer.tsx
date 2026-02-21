import { useState, useCallback, useEffect } from 'react';
import type { VideoItem } from '../../../types';
import { useVideoPlayer } from '../hooks';
import { VideoControls } from './VideoControls';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  video: VideoItem;
  autoPlay?: boolean;
  onTimeUpdate?: (time: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export function VideoPlayer({
  video,
  autoPlay = true,
  onTimeUpdate,
  onPlayStateChange,
}: VideoPlayerProps) {
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<number | null>(null);

  const {
    isPlaying,
    currentTime,
    duration,
    isBuffering,
    hasError,
    togglePlay,
    skipForward,
    skipBackward,
    seekTo,
    videoProps,
  } = useVideoPlayer({
    autoPlay,
    onTimeUpdate,
    onPlayStateChange,
  });

  // Auto-hide controls after inactivity
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }

    setShowControls(true);

    if (isPlaying) {
      const timeout = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setControlsTimeout(timeout);
    }
  }, [isPlaying, controlsTimeout]);

  // Show controls when paused
  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
        setControlsTimeout(null);
      }
    } else {
      resetControlsTimeout();
    }
  }, [isPlaying]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [controlsTimeout]);

  const handleInteraction = useCallback(() => {
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const handleVideoClick = useCallback(() => {
    togglePlay();
    resetControlsTimeout();
  }, [togglePlay, resetControlsTimeout]);

  if (hasError) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <ErrorIcon />
          <p>Failed to load video</p>
          <span>Please try again later</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <video
        {...videoProps}
        className={styles.video}
        src={video.videoUrl}
        playsInline
        onClick={handleVideoClick}
      />

      {/* Buffering indicator */}
      {isBuffering && (
        <div className={styles.bufferingOverlay}>
          <div className={styles.spinner} />
        </div>
      )}

      {/* Controls overlay */}
      <div
        className={`${styles.controlsOverlay} ${showControls ? styles.visible : ''}`}
      >
        <VideoControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          onTogglePlay={togglePlay}
          onSkipForward={() => skipForward(10)}
          onSkipBackward={() => skipBackward(10)}
          onSeek={seekTo}
        />
      </div>
    </div>
  );
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
}
