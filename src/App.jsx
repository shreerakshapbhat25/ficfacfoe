// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import TicTacToe from './TicTacToe.jsx'; // Import the TicTacToe component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} /> {/* Use TicTacToe component */}
      </Routes>
    </Router>
  );
}

export default App;
