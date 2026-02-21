import { usePlayerStore } from '../../../store';

export function MiniPlayer() {
  const { mode, currentVideo } = usePlayerStore();

  // Only show when minimized
  if (mode !== 'minimized' || !currentVideo) {
    return null;
  }

  return (
    <div className="mini-player">
      <p>Mini player - {currentVideo.title}</p>
      <p>Full implementation in Phase 5</p>
    </div>
  );
}
