import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, Login, Register, Profile, ProtectedRoute, Navigation } from './Users';
import NewsProvider from './NewsApi/NewsContext';
import Dashboard from './NewsApi/Dashboard';
import Article from './NewsApi/Article';
import Home from './NewsApi/Home';
import './App.css';

function App() {
  return (
    <UserProvider>
      <NewsProvider>
        <Router>
          <div className="App">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
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
              <Route path="/dashboard/:url" element={<Article />} />

            </Routes>
          </div>
        </Router>
      </NewsProvider>
    </UserProvider>
  );
}

export default App;
