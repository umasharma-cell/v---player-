import type { VideoItem } from '../../../types';
import { formatDuration } from '../../../utils';
import styles from './RelatedVideoItem.module.css';

interface RelatedVideoItemProps {
  video: VideoItem;
  onSelect: (video: VideoItem) => void;
}

export function RelatedVideoItem({ video, onSelect }: RelatedVideoItemProps) {
  return (
    <button
      className={styles.item}
      onClick={() => onSelect(video)}
    >
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
    </button>
  );
}
