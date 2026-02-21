import type { CategoryGroup } from '../../types';
import { VideoCard } from './VideoCard';
import styles from './CategorySection.module.css';

interface CategorySectionProps {
  group: CategoryGroup;
}

export function CategorySection({ group }: CategorySectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{group.category}</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.videoList}>
          {group.videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
