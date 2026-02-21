# UX Flow — Video Player Application

## Overview

This application follows a **YouTube mobile-like** UX pattern (NOT YouTube Shorts vertical swipe feed). The core experience centers on a scrollable category feed, full-page player with custom controls, in-player related videos, and a persistent mini-player.

---

## Screen Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         HOME FEED (/)                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Category: Action                                         │   │
│  │ ┌────────┐ ┌────────┐ ┌────────┐                        │   │
│  │ │ Video  │ │ Video  │ │ Video  │  ← Horizontal scroll   │   │
│  │ │ Card   │ │ Card   │ │ Card   │                        │   │
│  │ └────────┘ └────────┘ └────────┘                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Category: Comedy                                         │   │
│  │ ┌────────┐ ┌────────┐ ┌────────┐                        │   │
│  │ │ Video  │ │ Video  │ │ Video  │                        │   │
│  │ └────────┘ └────────┘ └────────┘                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ↓ tap card                         │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FULL-PAGE PLAYER (/watch/:id)                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │                    VIDEO PLAYER                          │   │
│  │                    (auto-plays)                          │   │
│  │                                                          │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │ advancement-10   advancement advancement+10 advancement │ ← Controls │   │
│  │  │ ────advancement────○───────────────── 1:23 / 5:00  │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ↑ swipe up / scroll down reveals related list                  │
│  ↓ drag down minimizes to mini-player                           │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ RELATED VIDEOS (same category)          ← Bottom Sheet  │   │
│  │ ┌────────────────────────────────────┐                  │   │
│  │ │ Video item (tap to switch)         │                  │   │
│  │ └────────────────────────────────────┘                  │   │
│  │ ┌────────────────────────────────────┐                  │   │
│  │ │ Video item                         │                  │   │
│  │ └────────────────────────────────────┘                  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                               │
                    drag down  │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                         HOME FEED (/)                           │
│                                                                  │
│  (browse while mini-player persists at bottom)                  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ MINI-PLAYER (docked bottom)                              │   │
│  │ ┌──────┐ Video Title          ▶️ ✕                       │   │
│  │ │ thumb│                                                 │   │
│  │ └──────┘        tap anywhere to restore full-screen      │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core User Journeys

### Journey 1: Browse → Watch
1. User lands on Home (`/`)
2. Scrolls vertically through category sections
3. Taps a video card
4. Transition animates to full-page player (`/watch/:id`)
5. Video auto-plays immediately

### Journey 2: Watch → Related
1. While in full-page player, user swipes up or scrolls down
2. Bottom sheet reveals with related videos (same category)
3. User taps a related video
4. Playback switches instantly (no page reload)
5. Related list updates if new video has different category

### Journey 3: Watch → Minimize → Browse → Restore
1. User drags down on full-page player
2. Player shrinks and docks as mini-player at bottom
3. Route changes back to Home (`/`)
4. Mini-player continues playing; user can browse feed
5. User taps mini-player → restores to full-page player

### Journey 4: Mini-Player → Close
1. User taps close (✕) on mini-player
2. Playback stops, mini-player dismisses
3. User continues browsing Home normally

---

## Routing Strategy

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Category feed with video cards |
| `/watch/:id` | PlayerPage | Full-page player with controls + related list |

### State Considerations
- **Mini-player** is a global overlay, NOT a separate route
- When minimized: route changes to `/` but player state persists in global context
- When restored: route changes to `/watch/:id`

### URL Design
- Use video `id` (or slug) in URL for deep-linking
- Example: `/watch/abc123` where `abc123` is the video identifier

---

## Gesture Mapping

| Gesture | Context | Action |
|---------|---------|--------|
| Tap | Video card on Home | Open full-page player |
| Swipe up | Full-page player | Reveal related list |
| Scroll down | Full-page player (at top) | Reveal related list |
| Drag down | Full-page player | Minimize to mini-player |
| Tap | Mini-player body | Restore to full-page |
| Tap | Mini-player close button | Dismiss and stop playback |
| Tap | Related video item | Switch playback immediately |

---

## Responsive Behavior

### Mobile (< 768px)
- Full-width video player
- Controls overlay on video
- Bottom sheet covers ~60-70% of screen when expanded
- Mini-player: small thumbnail + title + controls

### Desktop (≥ 768px)
- Centered video player with max-width
- Similar controls, larger hit areas
- Related list can be side panel or bottom sheet
- Mini-player in corner

---

## Animation Principles

1. **Transitions**: Use transform/opacity only (GPU-accelerated)
2. **Duration**: 200-300ms for UI feedback, 300-400ms for page transitions
3. **Easing**: ease-out for enters, ease-in for exits
4. **Continuity**: Video element should not unmount during minimize/restore

---

## Technical Decisions

### Video Playback
- Primary: HTML5 `<video>` with MP4 sources
- Dataset provides YouTube embed URLs, but we'll map to playable MP4 demo URLs
- This ensures full custom control integration (no iframe restrictions)

### State Management
- Global player state (current video, playback status, mode)
- Persists across route changes for mini-player functionality
- Options: React Context, Zustand, or similar lightweight solution

### Gesture Library
- Consider: framer-motion, react-use-gesture, or native touch events
- Must support: drag, swipe, velocity-based thresholds
