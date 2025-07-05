const BASE_URL = 'https://pokeapi.co/api/v2';

export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  },
};
