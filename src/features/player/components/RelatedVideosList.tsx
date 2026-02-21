import { useMemo } from 'react';
import type { VideoItem } from '../../../types';
import { getRelatedVideos } from '../../../data';
import { BottomSheet } from './BottomSheet';
import { RelatedVideoItem } from './RelatedVideoItem';
import styles from './RelatedVideosList.module.css';

interface RelatedVideosListProps {
  currentVideo: VideoItem;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectVideo: (video: VideoItem) => void;
}

export function RelatedVideosList({
  currentVideo,
  isOpen,
  onOpenChange,
  onSelectVideo,
}: RelatedVideosListProps) {
  const relatedVideos = useMemo(
    () => getRelatedVideos(currentVideo),
    [currentVideo]
  );

  const handleSelect = (video: VideoItem) => {
    onSelectVideo(video);
    onOpenChange(false);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={`More in ${currentVideo.category}`}
    >
      <div className={styles.list}>
        {relatedVideos.length > 0 ? (
          relatedVideos.map((video) => (
            <RelatedVideoItem
              key={video.id}
              video={video}
              onSelect={handleSelect}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <p>No more videos in this category</p>
          </div>
        )}
      </div>
    </BottomSheet>
  );
}
