import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-sleep-soft dark:bg-sleep-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-sleep-blue/10 via-sleep-lavender/10 to-sleep-purple/10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-sleep-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-sleep-lavender/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-sleep-text dark:text-white mb-6 animate-fade-in">
              Check your health,
              <span className="block text-sleep-blue dark:text-sleep-blue">sleep easy.</span>
            </h1>
            <p className="text-xl text-sleep-text/70 dark:text-white/70 mb-8 max-w-3xl mx-auto animate-slide-up">
              BloodWise uses advanced AI to analyze your blood test results and provide early anemia detection. 
              Get peace of mind with our sleep-inspired, calming health assessment tool.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              {user ? (
                <Link to="/scan" className="btn-primary text-lg px-8 py-4">
                  Start Scan
                </Link>
              ) : (
                <Link to="/login" className="btn-primary text-lg px-8 py-4">
                  Get Started
                </Link>
              )}
              <Link to="/about" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/50 dark:bg-sleep-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-sleep-text dark:text-white mb-4">
              Why Choose BloodWise?
            </h2>
            <p className="text-lg text-sleep-text/70 dark:text-white/70">
              Advanced AI technology meets calming, sleep-inspired design
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-sleep-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sleep-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-sleep-text dark:text-white mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-sleep-text/70 dark:text-white/70">
                Our machine learning model analyzes 24 biomarkers using your 4 key blood test values for comprehensive anemia assessment.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-sleep-lavender/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sleep-lavender" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-sleep-text dark:text-white mb-2">
                Secure & Private
              </h3>
              <p className="text-sleep-text/70 dark:text-white/70">
                Your health data is encrypted and stored securely. Only you can access your prediction history.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-sleep-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sleep-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-sleep-text dark:text-white mb-2">
                Calming Experience
              </h3>
              <p className="text-sleep-text/70 dark:text-white/70">
                Sleep-inspired design with soft colors and smooth animations for a stress-free health assessment experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 bg-gradient-to-r from-sleep-blue/10 to-sleep-lavender/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-sleep-text dark:text-white mb-4">
            Ready to check your health?
          </h2>
          <p className="text-lg text-sleep-text/70 dark:text-white/70 mb-8">
            Get started with BloodWise today and experience the future of health screening.
          </p>
          {user ? (
            <Link to="/scan" className="btn-primary text-lg px-8 py-4">
              Start Your Analysis
            </Link>
          ) : (
            <Link to="/login" className="btn-primary text-lg px-8 py-4">
              Sign Up Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
