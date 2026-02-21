import { useParams } from 'react-router-dom';

export function PlayerPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="player-page">
      <h1>Player</h1>
      <p>Playing video: {id}</p>
      <p>Full player coming in Phase 3</p>
    </div>
  );
}
