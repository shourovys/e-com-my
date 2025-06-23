import { jwtDecode } from 'jwt-decode';
import apiService from './api';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  exp: number;
}

// Check if we're running in the browser environment
const isBrowser = typeof window !== 'undefined';

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user';

  /**
   * Initialize the auth service and restore session from storage if available
   */
  constructor() {
    // Only initialize auth in browser environment
    if (isBrowser) {
      this.initializeAuth();
    }
  }

  /**
   * Initialize authentication from stored tokens
   */
  private initializeAuth(): void {
    const token = this.getFromStorage(this.TOKEN_KEY);

    if (token) {
      try {
        // Validate token and set if valid
        if (this.isTokenValid(token)) {
          apiService.setToken(token);
        } else {
          // Token is invalid, try to refresh or clear auth
          this.handleInvalidToken();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        this.clearAuth();
      }
    }
  }

  /**
   * Get item from localStorage with browser check
   */
  private getFromStorage(key: string): string | null {
    if (!isBrowser) return null;
    return localStorage.getItem(key);
  }

  /**
   * Set item in localStorage with browser check
   */
  private setInStorage(key: string, value: string): void {
    if (!isBrowser) return;
    localStorage.setItem(key, value);
  }

  /**
   * Remove item from localStorage with browser check
   */
  private removeFromStorage(key: string): void {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  /**
   * Check if token is valid based on expiration
   */
  private isTokenValid(token: string): boolean {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Date.now() / 1000;

      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  }

  /**
   * Handle invalid token scenario - attempt refresh or clear auth
   */
  private handleInvalidToken(): void {
    const refreshToken = this.getFromStorage(this.REFRESH_TOKEN_KEY);

    if (refreshToken) {
      this.refreshToken(refreshToken).catch(() => {
        this.clearAuth();
      });
    } else {
      this.clearAuth();
    }
  }

  /**
   * Try to refresh the access token using the refresh token
   */
  private async refreshToken(refreshToken: string): Promise<void> {
    try {
      const response = await apiService.post<
        { refreshToken: string },
        AuthResponse
      >('/auth/refresh-token', { refreshToken });

      this.handleAuthResponse(response);
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  /**
   * Process authentication response and store tokens/user data
   */
  private handleAuthResponse(response: AuthResponse): void {
    const { token, refreshToken, user } = response;

    // Store tokens and user data
    this.setInStorage(this.TOKEN_KEY, token);
    this.setInStorage(this.USER_KEY, JSON.stringify(user));

    if (refreshToken) {
      this.setInStorage(this.REFRESH_TOKEN_KEY, refreshToken);
    }

    // Set token in API service for future requests
    apiService.setToken(token);
  }

  /**
   * Remove all auth data from storage
   */
  private clearAuth(): void {
    this.removeFromStorage(this.TOKEN_KEY);
    this.removeFromStorage(this.REFRESH_TOKEN_KEY);
    this.removeFromStorage(this.USER_KEY);
    apiService.setToken(null);
  }

  /**
   * Authenticate user with email and password
   */
  public async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await apiService.post<LoginCredentials, AuthResponse>(
        '/auth/login',
        credentials
      );

      this.handleAuthResponse(response);
      return response.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Register a new user account
   */
  public async signup(credentials: SignupCredentials): Promise<User> {
    try {
      const response = await apiService.post<SignupCredentials, AuthResponse>(
        '/auth/signup',
        credentials
      );

      this.handleAuthResponse(response);
      return response.user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  /**
   * Log out the current user
   */
  public logout(): void {
    this.clearAuth();
  }

  /**
   * Get the current authenticated user from storage
   */
  public getCurrentUser(): User | null {
    const userData = this.getFromStorage(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Check if user is currently authenticated
   */
  public isAuthenticated(): boolean {
    const token = this.getFromStorage(this.TOKEN_KEY);
    return token !== null && this.isTokenValid(token);
  }
}

const authService = new AuthService();
export default authService;
