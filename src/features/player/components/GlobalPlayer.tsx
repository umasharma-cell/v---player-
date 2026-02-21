import { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useAnimation, type PanInfo } from 'framer-motion';
import { usePlayerStore } from '../../../store';
import { useVideoPlayer } from '../hooks';
import { VideoControls } from './VideoControls';
import { MiniPlayerUI } from './MiniPlayerUI';
import styles from './GlobalPlayer.module.css';

const MINIMIZE_THRESHOLD = 100;
const MINIMIZE_VELOCITY = 500;

export function GlobalPlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    currentVideo,
    mode,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    minimize,
    maximize,
    close,
  } = usePlayerStore();

  const {
    isPlaying,
    currentTime,
    duration,
    isBuffering,
    togglePlay,
    skipForward,
    skipBackward,
    seekTo,
    play,
    pause,
    videoProps,
  } = useVideoPlayer({
    autoPlay: true,
    onTimeUpdate: setCurrentTime,
    onDurationChange: setDuration,
    onPlayStateChange: setIsPlaying,
  });

  // Sync play state with store
  useEffect(() => {
    setIsPlaying(isPlaying);
  }, [isPlaying, setIsPlaying]);

  // Handle drag end for minimize gesture
  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (mode !== 'fullscreen') return;

      const shouldMinimize =
        info.offset.y > MINIMIZE_THRESHOLD ||
        info.velocity.y > MINIMIZE_VELOCITY;

      if (shouldMinimize) {
        minimize();
        // Navigate back to home if we're on a watch page
        if (location.pathname.startsWith('/watch')) {
          navigate('/', { replace: true });
        }
      } else {
        controls.start({ y: 0 });
      }
    },
    [mode, minimize, navigate, location.pathname, controls]
  );

  // Handle restore from mini-player
  const handleRestore = useCallback(() => {
    if (currentVideo) {
      maximize();
      navigate(`/watch/${currentVideo.id}`);
    }
  }, [currentVideo, maximize, navigate]);

  // Handle close
  const handleClose = useCallback(() => {
    close();
  }, [close]);

  // Handle mini-player play/pause
  const handleMiniTogglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Don't render if no video or hidden
  if (!currentVideo || mode === 'hidden') {
    return null;
  }

  const isFullscreen = mode === 'fullscreen';
  const isMinimized = mode === 'minimized';

  return (
    <>
      {/* Fullscreen player */}
      {isFullscreen && (
        <motion.div
          ref={containerRef}
          className={styles.fullscreenContainer}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          <div className={styles.videoWrapper}>
            <video
              {...videoProps}
              className={styles.video}
              src={currentVideo.videoUrl}
              playsInline
            />

            {isBuffering && (
              <div className={styles.bufferingOverlay}>
                <div className={styles.spinner} />
              </div>
            )}

            <div className={styles.controlsOverlay}>
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

            {/* Drag indicator */}
            <div className={styles.dragIndicator}>
              <div className={styles.dragHandle} />
            </div>
          </div>
        </motion.div>
      )}

      {/* Mini player */}
      {isMinimized && (
        <MiniPlayerUI
          video={currentVideo}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          onTogglePlay={handleMiniTogglePlay}
          onRestore={handleRestore}
          onClose={handleClose}
          videoElement={
            <video
              {...videoProps}
              className={styles.miniVideo}
              src={currentVideo.videoUrl}
              playsInline
              muted={false}
            />
          }
        />
      )}
    </>
  );
}
