import { create } from 'zustand';
import type { VideoItem, PlayerMode } from '../types';

interface PlayerStore {
  // State
  currentVideo: VideoItem | null;
  mode: PlayerMode;
  isPlaying: boolean;
  currentTime: number;
  duration: number;

  // Actions
  setVideo: (video: VideoItem) => void;
  clearVideo: () => void;
  setMode: (mode: PlayerMode) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  // Initial state
  currentVideo: null,
  mode: 'hidden',
  isPlaying: false,
  currentTime: 0,
  duration: 0,

  // Actions
  setVideo: (video) =>
    set({
      currentVideo: video,
      mode: 'fullscreen',
      currentTime: 0,
      duration: 0,
    }),

  clearVideo: () =>
    set({
      currentVideo: null,
      mode: 'hidden',
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    }),

  setMode: (mode) => set({ mode }),

  setIsPlaying: (isPlaying) => set({ isPlaying }),

  setCurrentTime: (currentTime) => set({ currentTime }),

  setDuration: (duration) => set({ duration }),

  minimize: () => set({ mode: 'minimized' }),

  maximize: () => set({ mode: 'fullscreen' }),

  close: () =>
    set({
      currentVideo: null,
      mode: 'hidden',
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    }),
}));
