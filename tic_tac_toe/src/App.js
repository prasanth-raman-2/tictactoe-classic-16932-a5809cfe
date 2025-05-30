import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            {/* Removed template button for clean game layout */}
          </div>
        </div>
      </nav>

      <main>
        {/* Center the game container */}
        <TicTacToeClassic />
      </main>
    </div>
  );
}

export default App;