# Requirements to Feature Mapping

This document maps each requirement from the assignment to specific implementation features.

---

## Core Requirements

### 1. Home Page Feed

| Requirement | Feature | Implementation |
|-------------|---------|----------------|
| Scrollable list of videos | Vertical scroll container | Native scroll with CSS |
| Grouped by category | Category sections | Group videos by category, render sections |
| Thumbnail on card | VideoCard component | `<img>` with thumbnail URL |
| Title on card | VideoCard component | Text element with truncation |
| Duration on card | VideoCard component | Formatted duration badge |
| Category badge on card | VideoCard component | Styled badge/chip |
| Click opens full-page player | Navigation handler | Router push to `/watch/:id` |
| Smooth transition | Page transition | CSS/JS animation on route change |

**Acceptance Criteria:**
- [ ] Home displays multiple category sections
- [ ] Each section has horizontal or grid video cards
- [ ] Cards show: thumbnail, title, duration, category badge
- [ ] Clicking card navigates to player with animation

---

### 2. Full-Page Video Player

| Requirement | Feature | Implementation |
|-------------|---------|----------------|
| Auto-play on open | Playback trigger | `autoPlay` + user interaction handling |
| Play/Pause control | Control button | Toggle playback state |
| Skip +10 seconds | Control button | `currentTime += 10` |
| Skip -10 seconds | Control button | `currentTime -= 10` |
| Seekable progress bar | Slider component | Input range or custom draggable |
| Current time display | Time component | Format `currentTime` |
| Total duration display | Time component | Format `duration` |
| Responsive layout | CSS | Mobile-first, breakpoints |
| MP4 support | Video element | `<video>` with `src` |
| HLS support (bonus) | HLS.js library | Optional enhancement |

**Acceptance Criteria:**
- [ ] Video auto-plays when player opens
- [ ] Play/pause button toggles correctly
- [ ] +10/-10 buttons skip correctly (clamped to bounds)
- [ ] Progress bar is draggable/tappable
- [ ] Progress bar reflects current position
- [ ] Time displays update in real-time
- [ ] Layout works on mobile (320px+) and desktop

---

### 3. In-Player Related Video List

| Requirement | Feature | Implementation |
|-------------|---------|----------------|
| Reveal via swipe up | Gesture handler | Touch/drag detection |
| Reveal via scroll down | Scroll handler | Scroll position detection |
| Filter same category | Data filter | Filter videos by current category |
| Click switches playback | Click handler | Update current video state |
| Immediate switch | State update | No loading screen, instant |
| Autoplay on switch | Playback trigger | Auto-play new video |
| Update list on category change | Effect/subscription | Re-filter when category changes |
| Smooth scrolling | CSS/behavior | `scroll-behavior: smooth` |
| Fluid animations | Animation library | Spring physics, transforms |

**Acceptance Criteria:**
- [ ] Swipe up reveals bottom sheet
- [ ] Scroll down at top reveals bottom sheet
- [ ] Related list shows only same-category videos
- [ ] Current video excluded from list
- [ ] Tapping item switches video instantly
- [ ] New video auto-plays
- [ ] List updates if new video has different category
- [ ] Animations feel smooth (60fps)

---

### 4. Drag-to-Minimize Mini-Player

| Requirement | Feature | Implementation |
|-------------|---------|----------------|
| Drag down to minimize | Gesture handler | Vertical drag detection |
| Shrink animation | Transform animation | Scale + translate |
| Dock to bottom | Position styling | Fixed bottom position |
| Mini-player shows video | Video element | Same video element, scaled |
| Mini-player shows title | Text element | Current video title |
| Mini-player play/pause | Control button | Toggle playback |
| Mini-player close | Close button | Stop + dismiss |
| Persists while browsing | Global state | Player context persists |
| Continues playing | Video continuity | Don't unmount video element |
| Tap restores full-screen | Click handler | Expand animation + route |

**Acceptance Criteria:**
- [ ] Drag down triggers minimize animation
- [ ] Mini-player docks at bottom of screen
- [ ] Video continues playing (no restart)
- [ ] Title is visible on mini-player
- [ ] Play/pause works on mini-player
- [ ] Close stops playback and removes mini-player
- [ ] User can browse Home with mini-player visible
- [ ] Tapping mini-player restores full-screen player

---

## Bonus Requirements (Post-Core)

| Bonus | Feature | Priority |
|-------|---------|----------|
| Autoplay next | Countdown timer + next video | Medium |
| 2-second countdown | Visual countdown UI | Medium |
| Cancel autoplay | Cancel button | Medium |
| Virtualized/infinite scroll | react-window or similar | Low |
| Browser PiP API | `requestPictureInPicture()` | Low |
| Enhanced skip feedback | Visual ripple/toast | Low |

---

## Non-Functional Requirements

| Requirement | Target | Implementation |
|-------------|--------|----------------|
| Performance | 60fps animations | GPU-accelerated transforms |
| Mobile-first | Works on 320px+ | Responsive CSS |
| Accessibility | Basic a11y | ARIA labels, focus management |
| Error handling | Graceful failures | Error boundaries, fallback UI |

---

## Data Model Requirements

| Field | Required | Source |
|-------|----------|--------|
| `id` | Yes | Dataset or generated |
| `title` | Yes | Dataset |
| `thumbnail` | Yes | Dataset or derived |
| `duration` | Yes | Dataset (seconds) |
| `category` | Yes | Dataset |
| `videoUrl` | Yes | MP4 URL (mapped from dataset) |

---

## Out of Scope

- User authentication
- Comments/likes
- Upload functionality
- Backend/API (static data only)
- Offline support
- Analytics
