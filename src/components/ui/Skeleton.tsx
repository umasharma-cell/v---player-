import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = '100%',
  borderRadius = 8,
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }}
    />
  );
}

export function VideoCardSkeleton() {
  return (
    <div className={styles.videoCard}>
      <Skeleton height={0} className={styles.thumbnail} />
      <div className={styles.info}>
        <Skeleton height={16} width="90%" borderRadius={4} />
        <Skeleton height={12} width="40%" borderRadius={4} />
      </div>
    </div>
  );
}
