import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { VideoItem } from '../../types';
import { formatDuration } from '../../utils';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  video: VideoItem;
}

export function VideoCard({ video }: VideoCardProps) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = useCallback(() => {
    navigate(`/watch/${video.id}`);
  }, [navigate, video.id]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  return (
    <article
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className={styles.thumbnailContainer}>
        {/* Skeleton placeholder */}
        {!imageLoaded && <div className={styles.skeleton} />}

        {/* Actual image */}
        {!imageError ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`${styles.thumbnail} ${imageLoaded ? styles.loaded : ''}`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className={styles.errorPlaceholder}>
            <VideoIcon />
          </div>
        )}

        <span className={styles.duration}>{formatDuration(video.duration)}</span>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{video.title}</h3>
        <span className={styles.category}>{video.category}</span>
      </div>
    </article>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
      <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
    </svg>
  );
}
