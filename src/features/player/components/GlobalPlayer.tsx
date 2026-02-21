import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useAnimation, type PanInfo } from 'framer-motion';
import { usePlayerStore } from '../../../store';
import { getRelatedVideos } from '../../../data';
import { useVideoPlayer } from '../hooks';
import { VideoControls } from './VideoControls';
import { MiniPlayerUI } from './MiniPlayerUI';
import { AutoplayCountdown } from './AutoplayCountdown';
import styles from './GlobalPlayer.module.css';

const MINIMIZE_THRESHOLD = 100;
const MINIMIZE_VELOCITY = 500;

export function GlobalPlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAutoplay, setShowAutoplay] = useState(false);

  const {
    currentVideo,
    mode,
    setVideo,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    minimize,
    maximize,
    close,
  } = usePlayerStore();

  // Get next video in same category
  const nextVideo = useMemo(() => {
    if (!currentVideo) return null;
    const related = getRelatedVideos(currentVideo);
    return related.length > 0 ? related[0] : null;
  }, [currentVideo]);

  // Handle video ended
  const handleVideoEnded = useCallback(() => {
    if (nextVideo && mode === 'fullscreen') {
      setShowAutoplay(true);
    }
  }, [nextVideo, mode]);

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
    onEnded: handleVideoEnded,
  });

  // Sync play state with store
  useEffect(() => {
    setIsPlaying(isPlaying);
  }, [isPlaying, setIsPlaying]);

  // Hide autoplay when video changes
  useEffect(() => {
    setShowAutoplay(false);
  }, [currentVideo?.id]);

  // Handle play next video
  const handlePlayNext = useCallback(() => {
    if (nextVideo) {
      setShowAutoplay(false);
      setVideo(nextVideo);
      navigate(`/watch/${nextVideo.id}`, { replace: true });
    }
  }, [nextVideo, setVideo, navigate]);

  // Handle cancel autoplay
  const handleCancelAutoplay = useCallback(() => {
    setShowAutoplay(false);
  }, []);

  // Handle drag end for minimize gesture
  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (mode !== 'fullscreen') return;

      const shouldMinimize =
        info.offset.y > MINIMIZE_THRESHOLD ||
        info.velocity.y > MINIMIZE_VELOCITY;

      if (shouldMinimize) {
        minimize();
        setShowAutoplay(false);
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
    setShowAutoplay(false);
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

            {/* Autoplay countdown overlay */}
            <AutoplayCountdown
              nextVideo={nextVideo}
              isVisible={showAutoplay}
              countdownSeconds={5}
              onPlayNext={handlePlayNext}
              onCancel={handleCancelAutoplay}
            />

            {/* Controls overlay - hide during autoplay */}
            {!showAutoplay && (
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
            )}

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
