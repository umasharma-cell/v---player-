import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from './pages/HomePage';
import { PlayerPage } from './pages/PlayerPage';
import { MiniPlayer } from './features/player/components/MiniPlayer';
import { PageTransition } from './components/ui';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/watch/:id"
          element={
            <PageTransition>
              <PlayerPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AnimatedRoutes />
        <MiniPlayer />
      </div>
    </BrowserRouter>
  );
}

export default App;
