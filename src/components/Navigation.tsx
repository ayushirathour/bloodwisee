import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useTheme } from '../utils/ThemeContext';

const Navigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav className="bg-white/80 dark:bg-sleep-dark/80 backdrop-blur-md border-b border-sleep-light dark:border-sleep-dark/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-sleep-blue to-sleep-lavender rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BW</span>
            </div>
            <span className="text-xl font-bold text-sleep-text dark:text-white">BloodWise</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/'
                  ? 'text-sleep-blue dark:text-sleep-blue'
                  : 'text-sleep-text/70 dark:text-white/70 hover:text-sleep-text dark:hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/scan"
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/scan'
                  ? 'text-sleep-blue dark:text-sleep-blue'
                  : 'text-sleep-text/70 dark:text-white/70 hover:text-sleep-text dark:hover:text-white'
              }`}
            >
              Scan
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/about'
                  ? 'text-sleep-blue dark:text-sleep-blue'
                  : 'text-sleep-text/70 dark:text-white/70 hover:text-sleep-text dark:hover:text-white'
              }`}
            >
              About
            </Link>
          </div>

          {/* Right side - Theme toggle and auth */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-sleep-light dark:bg-sleep-dark/30 hover:bg-sleep-light/80 dark:hover:bg-sleep-dark/50 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-sleep-text" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-sleep-text/70 dark:text-white/70">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-sleep-text/70 dark:text-white/70 hover:text-sleep-text dark:hover:text-white transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-sleep-blue dark:text-sleep-blue hover:text-sleep-blue/80 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
