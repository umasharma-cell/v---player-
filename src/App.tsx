import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PlayerPage } from './pages/PlayerPage';
import { MiniPlayer } from './features/player/components/MiniPlayer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/watch/:id" element={<PlayerPage />} />
        </Routes>
        <MiniPlayer />
      </div>
    </BrowserRouter>
  );
}

export default App;
