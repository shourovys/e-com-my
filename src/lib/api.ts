/**
 * API utility for making requests to Next.js API routes
 */

// For client-side API calls, we can use relative URLs
// For server-side calls (in getServerSideProps, etc.), we need the full URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Add a short delay for development to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch data from API with type safety
async function get<T>(endpoint: string): Promise<T> {
  try {
    // Add a small delay to simulate network latency in development
    if (process.env.NODE_ENV === 'development') {
      await delay(300);
    }

    const response = await fetch(`${BASE_URL}/api${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    // Return empty array as fallback to prevent app crashes
    return [] as unknown as T;
  }
}

// Post data to API with type safety
async function post<T, R = void>(endpoint: string, data: T): Promise<R> {
  try {
    const response = await fetch(`${BASE_URL}/api${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
}

// Update data in API with type safety
async function put<T, R = void>(endpoint: string, data: T): Promise<R> {
  try {
    const response = await fetch(`${BASE_URL}/api${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error);
    throw error;
  }
}

// Delete resource in API
async function del<R = void>(endpoint: string): Promise<R> {
  try {
    const response = await fetch(`${BASE_URL}/api${endpoint}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error deleting from ${endpoint}:`, error);
    throw error;
  }
}

const api = {
  get,
  post,
  put,
  delete: del,
};

export default api;
