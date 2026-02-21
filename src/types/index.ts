// Video item representing a single video in the catalog
export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: number; // in seconds
  category: Category;
  videoUrl: string;
  description?: string;
}

// Available categories
export type Category =
  | 'Action'
  | 'Comedy'
  | 'Drama'
  | 'Documentary'
  | 'Music'
  | 'Sports'
  | 'Technology'
  | 'Travel';

// Player display mode
export type PlayerMode = 'hidden' | 'fullscreen' | 'minimized';

// Player state for global store
export interface PlayerState {
  currentVideo: VideoItem | null;
  mode: PlayerMode;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

// Category group for home feed display
export interface CategoryGroup {
  category: Category;
  videos: VideoItem[];
}

// Player controls actions
export interface PlayerControls {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  skipForward: (seconds?: number) => void;
  skipBackward: (seconds?: number) => void;
}
