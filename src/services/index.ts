import apiService from './api';
import authService from './auth-service';
import notificationService from './notification-service';

export { apiService, authService, notificationService };

// Default export for convenience
export default {
  api: apiService,
  auth: authService,
  notification: notificationService,
};
