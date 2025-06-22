import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, Login, Register, Profile, ProtectedRoute, Navigation } from './Users';
import Dashboard from './NewsApi/Dashboard';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            {/* -----K added----- */}
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
