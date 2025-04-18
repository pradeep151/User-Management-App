const BASE_URL = 'http://localhost:5000/api';

export const apiWrapper = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error: ${response.status} - ${errorBody}`);
    }

    if (response.status !== 204) {
      return await response.json();
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
