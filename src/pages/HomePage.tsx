import { useMemo } from 'react';
import { getVideosGroupedByCategory } from '../data';
import { CategorySection } from '../components/video';
import { usePlayerStore } from '../store';
import styles from './HomePage.module.css';

export function HomePage() {
  const playerMode = usePlayerStore((state) => state.mode);
  const categoryGroups = useMemo(() => getVideosGroupedByCategory(), []);

  return (
    <div
      className={styles.page}
      style={{
        paddingBottom: playerMode === 'minimized' ? '80px' : '16px',
      }}
    >
      <header className={styles.header}>
        <h1 className={styles.logo}>VideoPlayer</h1>
      </header>

      <main className={styles.feed}>
        {categoryGroups.map((group) => (
          <CategorySection key={group.category} group={group} />
        ))}
      </main>
    </div>
  );
}
