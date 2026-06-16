import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PsicologosProvider } from './context/PsicologosContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CadastroPage from './pages/CadastroPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <PsicologosProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cadastro" element={<CadastroPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </PsicologosProvider>
    </Router>
  );
}

export default App;