import { useRef, useState, useCallback, useEffect } from 'react';

interface UseVideoPlayerOptions {
  autoPlay?: boolean;
  onTimeUpdate?: (currentTime: number) => void;
  onDurationChange?: (duration: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onEnded?: () => void;
}

export function useVideoPlayer(options: UseVideoPlayerOptions = {}) {
  const {
    autoPlay = true,
    onTimeUpdate,
    onDurationChange,
    onPlayStateChange,
    onEnded,
  } = options;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Play
  const play = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setIsPlaying(true);
      setHasError(false);
    } catch (error) {
      // Autoplay might be blocked by browser
      console.warn('Play failed:', error);
      setIsPlaying(false);
    }
  }, []);

  // Pause
  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setIsPlaying(false);
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Seek to specific time
  const seekTo = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video) return;

    const clampedTime = Math.max(0, Math.min(time, video.duration || 0));
    video.currentTime = clampedTime;
    setCurrentTime(clampedTime);
  }, []);

  // Skip forward
  const skipForward = useCallback((seconds = 10) => {
    const video = videoRef.current;
    if (!video) return;

    seekTo(video.currentTime + seconds);
  }, [seekTo]);

  // Skip backward
  const skipBackward = useCallback((seconds = 10) => {
    const video = videoRef.current;
    if (!video) return;

    seekTo(video.currentTime - seconds);
  }, [seekTo]);

  // Handle time update
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setCurrentTime(video.currentTime);
    onTimeUpdate?.(video.currentTime);
  }, [onTimeUpdate]);

  // Handle duration change
  const handleDurationChange = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isFinite(video.duration)) return;

    setDuration(video.duration);
    onDurationChange?.(video.duration);
  }, [onDurationChange]);

  // Handle play state changes
  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    onPlayStateChange?.(true);
  }, [onPlayStateChange]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    onPlayStateChange?.(false);
  }, [onPlayStateChange]);

  // Handle buffering
  const handleWaiting = useCallback(() => {
    setIsBuffering(true);
  }, []);

  const handleCanPlay = useCallback(() => {
    setIsBuffering(false);
  }, []);

  // Handle ended
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    onEnded?.();
  }, [onEnded]);

  // Handle error
  const handleError = useCallback(() => {
    setHasError(true);
    setIsPlaying(false);
  }, []);

  // Auto-play on mount
  useEffect(() => {
    if (autoPlay && videoRef.current) {
      // Small delay to ensure video is ready
      const timer = setTimeout(() => {
        play();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, play]);

  return {
    videoRef,
    isPlaying,
    currentTime,
    duration,
    isBuffering,
    hasError,
    // Controls
    play,
    pause,
    togglePlay,
    seekTo,
    skipForward,
    skipBackward,
    // Event handlers to attach to video element
    videoProps: {
      ref: videoRef,
      onTimeUpdate: handleTimeUpdate,
      onDurationChange: handleDurationChange,
      onLoadedMetadata: handleDurationChange,
      onPlay: handlePlay,
      onPause: handlePause,
      onWaiting: handleWaiting,
      onCanPlay: handleCanPlay,
      onEnded: handleEnded,
      onError: handleError,
    },
  };
}
