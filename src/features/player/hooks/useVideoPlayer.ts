import { useRef, useState, useCallback, useEffect } from 'react';

interface UseVideoPlayerOptions {
  autoPlay?: boolean;
  onTimeUpdate?: (currentTime: number) => void;
  onDurationChange?: (duration: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onEnded?: () => void;
  onPiPChange?: (isPiP: boolean) => void;
}

export function useVideoPlayer(options: UseVideoPlayerOptions = {}) {
  const {
    autoPlay = true,
    onTimeUpdate,
    onDurationChange,
    onPlayStateChange,
    onEnded,
    onPiPChange,
  } = options;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [isPiPSupported, setIsPiPSupported] = useState(false);

  // Check PiP support on mount
  useEffect(() => {
    setIsPiPSupported(
      'pictureInPictureEnabled' in document && document.pictureInPictureEnabled
    );
  }, []);

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

  // Enter Picture-in-Picture
  const enterPiP = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isPiPSupported) return;

    try {
      await video.requestPictureInPicture();
    } catch (error) {
      console.warn('PiP failed:', error);
    }
  }, [isPiPSupported]);

  // Exit Picture-in-Picture
  const exitPiP = useCallback(async () => {
    if (document.pictureInPictureElement) {
      try {
        await document.exitPictureInPicture();
      } catch (error) {
        console.warn('Exit PiP failed:', error);
      }
    }
  }, []);

  // Toggle PiP
  const togglePiP = useCallback(() => {
    if (isPiP) {
      exitPiP();
    } else {
      enterPiP();
    }
  }, [isPiP, enterPiP, exitPiP]);

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

  // Handle PiP events
  const handleEnterPiP = useCallback(() => {
    setIsPiP(true);
    onPiPChange?.(true);
  }, [onPiPChange]);

  const handleLeavePiP = useCallback(() => {
    setIsPiP(false);
    onPiPChange?.(false);
  }, [onPiPChange]);

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
    isPiP,
    isPiPSupported,
    // Controls
    play,
    pause,
    togglePlay,
    seekTo,
    skipForward,
    skipBackward,
    enterPiP,
    exitPiP,
    togglePiP,
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
      onEnterpictureinpicture: handleEnterPiP,
      onLeavepictureinpicture: handleLeavePiP,
    },
  };
}
