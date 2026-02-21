# Video Player Application

A mobile-first video player app with YouTube mobile-like UX, featuring smooth playback, gesture interactions, and a clean UI.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **Framer Motion** - Animations and gestures
- **Zustand** - State management
- **React Router** - Routing
- **CSS Modules** - Scoped styling

## Features

### Core Features

#### Home Page Feed
- [x] Scrollable list of videos grouped by category
- [x] Video cards with thumbnail, title, duration, and category badge
- [x] Click to open full-page player
- [x] Smooth page transitions

#### Full-Page Video Player
- [x] Auto-play on open
- [x] Custom controls overlay
  - [x] Play/Pause button
  - [x] Skip +10/-10 seconds
  - [x] Seekable progress bar
  - [x] Current time / total duration
- [x] Responsive layout (mobile + desktop)
- [x] MP4 video support
- [x] Auto-hide controls after inactivity

#### In-Player Related Videos
- [x] Bottom sheet with swipe/scroll reveal
- [x] Filtered by same category
- [x] Click to switch video instantly
- [x] Auto-play on switch
- [x] List updates when category changes
- [x] Smooth spring animations

#### Drag-to-Minimize Mini-Player
- [x] Drag down gesture to minimize
- [x] Docked mini-player at bottom
- [x] Video continues playing
- [x] Shows title, play/pause, close button
- [x] Progress indicator
- [x] Persists while browsing home
- [x] Tap to restore full-screen

### Bonus Features

- [x] **Autoplay Next** - 5-second countdown with cancel option
- [x] **Loading Skeletons** - Shimmer effect for images
- [x] **Error Boundary** - Graceful error handling with retry
- [x] **Safe Area Support** - Notched device handling
- [x] **Accessibility** - Focus-visible styles, ARIA labels

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── PageTransition.tsx
│   │   ├── Skeleton.tsx
│   │   └── ErrorBoundary.tsx
│   └── video/                 # Video-specific components
│       ├── VideoCard.tsx
│       └── CategorySection.tsx
├── features/
│   └── player/
│       ├── components/        # Player components
│       │   ├── GlobalPlayer.tsx
│       │   ├── VideoPlayer.tsx
│       │   ├── VideoControls.tsx
│       │   ├── MiniPlayerUI.tsx
│       │   ├── BottomSheet.tsx
│       │   ├── RelatedVideosList.tsx
│       │   ├── AutoplayCountdown.tsx
│       │   └── SwipeUpHint.tsx
│       └── hooks/
│           └── useVideoPlayer.ts
├── pages/
│   ├── HomePage.tsx
│   └── PlayerPage.tsx
├── store/
│   └── playerStore.ts         # Zustand store
├── data/
│   ├── videos.ts              # Video dataset
│   └── index.ts               # Data helpers
├── types/
│   └── index.ts               # TypeScript types
└── utils/
    └── formatTime.ts          # Time formatting
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Known Limitations

- Video URLs use Google's sample videos (Big Buck Bunny, Sintel, etc.)
- No HLS support (MP4 only)
- No offline support
- No user authentication

## Performance Considerations

- GPU-accelerated animations (transform/opacity only)
- Lazy loading for images
- Minimal re-renders with Zustand selectors
- CSS containment for scroll containers
