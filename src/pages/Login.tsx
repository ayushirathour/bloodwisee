import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { toast } from 'react-hot-toast';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        toast.success('Account created! Please check your email for verification.');
      } else {
        await signIn(email, password);
        navigate('/scan');
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sleep-soft dark:bg-sleep-dark flex items-center justify-center py-12">
      <div className="card max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-sleep-text dark:text-white mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-sleep-text/70 dark:text-white/70">
            {isSignUp 
              ? 'Sign up to start your health journey with BloodWise'
              : 'Sign in to access your blood test analysis'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-sleep-text dark:text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-sleep-text dark:text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sleep-blue dark:text-sleep-blue hover:text-sleep-blue/80 transition-colors duration-200"
          >
            {isSignUp 
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"
            }
          </button>
        </div>

        <div className="mt-8 p-4 bg-sleep-blue/10 dark:bg-sleep-blue/20 rounded-lg">
          <h3 className="text-sm font-semibold text-sleep-text dark:text-white mb-2">
            Why Create an Account?
          </h3>
          <ul className="text-xs text-sleep-text/70 dark:text-white/70 space-y-1">
            <li>• Save and track your prediction history</li>
            <li>• Access your results anytime</li>
            <li>• Secure, encrypted data storage</li>
            <li>• Personalized health insights</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
