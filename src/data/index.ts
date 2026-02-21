import type { VideoItem, Category, CategoryGroup } from '../types';
import { videos } from './videos';

/**
 * Get all videos
 */
export function getAllVideos(): VideoItem[] {
  return videos;
}

/**
 * Get a video by ID
 */
export function getVideoById(id: string): VideoItem | undefined {
  return videos.find((video) => video.id === id);
}

/**
 * Get all unique categories from the video catalog
 */
export function getCategories(): Category[] {
  const categorySet = new Set<Category>();
  videos.forEach((video) => categorySet.add(video.category));
  return Array.from(categorySet);
}

/**
 * Get videos filtered by category
 */
export function getVideosByCategory(category: Category): VideoItem[] {
  return videos.filter((video) => video.category === category);
}

/**
 * Get videos grouped by category for home feed display
 */
export function getVideosGroupedByCategory(): CategoryGroup[] {
  const categoryMap = new Map<Category, VideoItem[]>();

  videos.forEach((video) => {
    const existing = categoryMap.get(video.category) || [];
    categoryMap.set(video.category, [...existing, video]);
  });

  return Array.from(categoryMap.entries()).map(([category, categoryVideos]) => ({
    category,
    videos: categoryVideos,
  }));
}

/**
 * Get related videos (same category, excluding current video)
 */
export function getRelatedVideos(currentVideo: VideoItem): VideoItem[] {
  return videos.filter(
    (video) => video.category === currentVideo.category && video.id !== currentVideo.id
  );
}

// Re-export videos array
export { videos };
