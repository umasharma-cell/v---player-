import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideoById } from '../data';
import { usePlayerStore } from '../store';
import type { VideoItem } from '../types';
import {
  VideoPlayer,
  RelatedVideosList,
  SwipeUpHint,
} from '../features/player/components';
import styles from './PlayerPage.module.css';

export function PlayerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setVideo, setIsPlaying, setCurrentTime, currentVideo, mode } = usePlayerStore();
  const [isRelatedOpen, setIsRelatedOpen] = useState(false);

  // Load video on mount or when ID changes
  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    const video = getVideoById(id);
    if (!video) {
      navigate('/');
      return;
    }

    // Only set video if it's different or we're not already in fullscreen
    if (!currentVideo || currentVideo.id !== id || mode !== 'fullscreen') {
      setVideo(video);
    }
  }, [id, navigate, setVideo, currentVideo, mode]);

  // Get current video from store or from data
  const video = currentVideo?.id === id ? currentVideo : getVideoById(id || '');

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, [setCurrentTime]);

  const handlePlayStateChange = useCallback((isPlaying: boolean) => {
    setIsPlaying(isPlaying);
  }, [setIsPlaying]);

  const handleSelectRelatedVideo = useCallback((selectedVideo: VideoItem) => {
    // Navigate to new video - this will trigger video switch
    navigate(`/watch/${selectedVideo.id}`, { replace: true });
  }, [navigate]);

  const handleOpenRelated = useCallback(() => {
    setIsRelatedOpen(true);
  }, []);

  if (!video) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.playerContainer}>
        <VideoPlayer
          video={video}
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onPlayStateChange={handlePlayStateChange}
        />
      </div>

      <div className={styles.videoInfo}>
        <h1 className={styles.title}>{video.title}</h1>
        <div className={styles.meta}>
          <span className={styles.category}>{video.category}</span>
          {video.description && (
            <p className={styles.description}>{video.description}</p>
          )}
        </div>
      </div>

      {/* Swipe up hint */}
      <div className={styles.hintContainer}>
        <SwipeUpHint
          onClick={handleOpenRelated}
          label={`More in ${video.category}`}
        />
      </div>

      {/* Related videos bottom sheet */}
      <RelatedVideosList
        currentVideo={video}
        isOpen={isRelatedOpen}
        onOpenChange={setIsRelatedOpen}
        onSelectVideo={handleSelectRelatedVideo}
      />
    </div>
  );
}
