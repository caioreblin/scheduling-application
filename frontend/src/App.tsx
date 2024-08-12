import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AgendamentosPage from './pages/AgendamentosPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/agendamentos" element={<AgendamentosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
