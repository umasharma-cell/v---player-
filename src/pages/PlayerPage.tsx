import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideoById } from '../data';
import { usePlayerStore } from '../store';
import type { VideoItem } from '../types';
import {
  RelatedVideosList,
  SwipeUpHint,
} from '../features/player/components';
import styles from './PlayerPage.module.css';

export function PlayerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setVideo, currentVideo, mode } = usePlayerStore();
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

    // Set video if it's different from current
    if (!currentVideo || currentVideo.id !== id) {
      setVideo(video);
    }
  }, [id, navigate, setVideo, currentVideo]);

  // Get current video from store or from data
  const video = currentVideo?.id === id ? currentVideo : getVideoById(id || '');

  const handleSelectRelatedVideo = useCallback((selectedVideo: VideoItem) => {
    setIsRelatedOpen(false);
    // Small delay to let sheet close before navigating
    setTimeout(() => {
      setVideo(selectedVideo);
      navigate(`/watch/${selectedVideo.id}`, { replace: true });
    }, 100);
  }, [navigate, setVideo]);

  const handleOpenRelated = useCallback(() => {
    setIsRelatedOpen(true);
  }, []);

  if (!video || mode === 'minimized') {
    return null;
  }

  return (
    <div className={styles.page}>
      {/* Spacer for the fixed video player */}
      <div className={styles.playerSpacer} />

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
