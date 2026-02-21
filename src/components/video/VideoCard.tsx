import { useNavigate } from 'react-router-dom';
import type { VideoItem } from '../../types';
import { formatDuration } from '../../utils';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  video: VideoItem;
}

export function VideoCard({ video }: VideoCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${video.id}`);
  };

  return (
    <article className={styles.card} onClick={handleClick}>
      <div className={styles.thumbnailContainer}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className={styles.thumbnail}
          loading="lazy"
        />
        <span className={styles.duration}>{formatDuration(video.duration)}</span>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{video.title}</h3>
        <span className={styles.category}>{video.category}</span>
      </div>
    </article>
  );
}
