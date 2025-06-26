import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 flex items-start justify-center py-16 px-4">
      <div className="bg-white max-w-3xl w-full p-10 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-6 drop-shadow">
          📰 Welcome to the News App
        </h1>

        <p className="text-lg text-center text-gray-600 mb-10">
          This app was created as part of a final React project in school.
          It features live news data, routing, and basic caching using modern web technologies.
        </p>

        <div className="flex justify-center gap-6 mb-10">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition"
          >
            🔐 Login
          </Link>
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition"
          >
            📊 Dashboard
          </Link>
        </div>

        <div className="text-center text-sm text-gray-500">
          Special thanks to{' '}
          <a
            href="https://newsapi.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-medium"
          >
            NewsAPI.org
          </a>{' '}
          for powering the headlines.
        </div>
      </div>
    </div>
  );
};

export default HomePage;