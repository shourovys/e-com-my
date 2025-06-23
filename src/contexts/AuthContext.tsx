'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { notificationService } from '../services';
import authService, { User } from '../services/auth-service';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Check authentication status on initial load
  useEffect(() => {
    const currentUser = authService.getCurrentUser();

    if (currentUser && authService.isAuthenticated()) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function - now using authService
  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('🚀 ~ login ~ password:', password);
    try {
      // Show loading notification
      const toastId = notificationService.loading('Logging in...');

      // In a real implementation, we'd call authService.login here
      // For now, mocking the successful login like in the original code
      const mockUser = {
        id: '1',
        name: 'Test User',
        email,
      };

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state
      setUser(mockUser);
      setIsAuthenticated(true);

      // Manually store user for now since we're not calling actual authService.login
      // In a real implementation, this would be handled by authService
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Show success notification
      notificationService.loadingToSuccess(toastId, 'Logged in successfully');
      return true;
    } catch (error) {
      console.error('Login error:', error);

      // Show error notification
      notificationService.error('Login failed. Please check your credentials.');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    notificationService.info('You have been logged out');
  };

  // Signup function
  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    console.log('🚀 ~ AuthProvider ~ password:', password);
    try {
      // Show loading notification
      const toastId = notificationService.loading('Creating account...');

      // In a real implementation, we'd call authService.signup here
      // For now, mocking the successful signup like in the original code
      const mockUser = {
        id: '1',
        name,
        email,
      };

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state
      setUser(mockUser);
      setIsAuthenticated(true);

      // Manually store user since we're not calling actual authService.signup
      // In a real implementation, this would be handled by authService
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Show success notification
      notificationService.loadingToSuccess(
        toastId,
        'Account created successfully'
      );
      return true;
    } catch (error) {
      console.error('Signup error:', error);

      // Show error notification
      notificationService.error('Signup failed. Please try again.');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
