import toast, { ToastOptions } from 'react-hot-toast';

// Check if we're running in the browser environment
const isBrowser = typeof window !== 'undefined';

// Default notification durations (in milliseconds)
const DEFAULT_DURATIONS = {
  success: 3000,
  error: 4000,
  info: 3000,
  warning: 4000,
  loading: 30000, // long duration for loading, usually dismissed manually
};

// Default notification options
const DEFAULT_OPTIONS: ToastOptions = {
  position: 'top-right',
};

class NotificationService {
  /**
   * Show a success notification
   */
  public success(message: string, options?: ToastOptions): string {
    if (!isBrowser) return '';
    return toast.success(message, {
      ...DEFAULT_OPTIONS,
      duration: DEFAULT_DURATIONS.success,
      ...options,
    });
  }

  /**
   * Show an error notification
   */
  public error(message: string, options?: ToastOptions): string {
    if (!isBrowser) return '';
    return toast.error(message, {
      ...DEFAULT_OPTIONS,
      duration: DEFAULT_DURATIONS.error,
      ...options,
    });
  }

  /**
   * Show an info notification
   */
  public info(message: string, options?: ToastOptions): string {
    if (!isBrowser) return '';
    return toast(message, {
      ...DEFAULT_OPTIONS,
      duration: DEFAULT_DURATIONS.info,
      ...options,
    });
  }

  /**
   * Show a warning notification
   */
  public warning(message: string, options?: ToastOptions): string {
    if (!isBrowser) return '';
    return toast(message, {
      ...DEFAULT_OPTIONS,
      icon: '⚠️',
      duration: DEFAULT_DURATIONS.warning,
      ...options,
    });
  }

  /**
   * Show a loading notification
   * @returns Toast ID that can be used to update or dismiss the notification
   */
  public loading(message: string, options?: ToastOptions): string {
    if (!isBrowser) return '';
    return toast.loading(message, {
      ...DEFAULT_OPTIONS,
      duration: DEFAULT_DURATIONS.loading,
      ...options,
    });
  }

  /**
   * Dismiss a specific notification by ID
   */
  public dismiss(toastId?: string): void {
    if (!isBrowser) return;
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      // Dismiss all notifications if no ID is provided
      toast.dismiss();
    }
  }

  /**
   * Update an existing notification
   */
  public update(
    toastId: string,
    message: string,
    options?: ToastOptions
  ): void {
    if (!isBrowser) return;
    toast.loading(message, {
      id: toastId,
      ...options,
    });
  }

  /**
   * Convert a loading notification to a success notification
   */
  public loadingToSuccess(
    toastId: string,
    message: string,
    options?: ToastOptions
  ): void {
    if (!isBrowser) return;
    toast.success(message, {
      id: toastId,
      ...DEFAULT_OPTIONS,
      duration: DEFAULT_DURATIONS.success,
      ...options,
    });
  }

  /**
   * Convert a loading notification to an error notification
   */
  public loadingToError(
    toastId: string,
    message: string,
    options?: ToastOptions
  ): void {
    if (!isBrowser) return;
    toast.error(message, {
      id: toastId,
      ...DEFAULT_OPTIONS,
      duration: DEFAULT_DURATIONS.error,
      ...options,
    });
  }
}

const notificationService = new NotificationService();
export default notificationService;
