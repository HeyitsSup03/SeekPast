import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';
import FirstTimeModal from './components/FirstTimeModal';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [hasVisited, setHasVisited] = useLocalStorage('hasVisited', false);
  const [showModal, setShowModal] = React.useState(!hasVisited);

  const handleCloseModal = () => {
    setShowModal(false);
    setHasVisited(true);
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
      {showModal && <FirstTimeModal onClose={handleCloseModal} />}
    </div>
  );
}

export default App;