import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from './pages/HomePage';
import { PlayerPage } from './pages/PlayerPage';
import { GlobalPlayer } from './features/player/components';
import { PageTransition, ErrorBoundary } from './components/ui';
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
    <ErrorBoundary>
      <BrowserRouter>
        <div className="app">
          <AnimatedRoutes />
          <GlobalPlayer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
