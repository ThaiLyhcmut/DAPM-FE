import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

// APIClient.ts
export class APIClient {
  constructor(
    private baseUrl: string,
    private getToken: () => string | null
  ) {}

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || `API error ${res.status}`);
    }

    return res.json();
  }

  get<T>(url: string) {
    return this.request<T>(url, { method: 'GET' });
  }

  post<T>(url: string, data: any) {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(url: string, data: any) {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(url: string) {
    return this.request<T>(url, { method: 'DELETE' });
  }
}


export const useApiClient = () => {
  const token = useSelector((state: RootState) => state.auth.user?.token);
  console.log('Token from store:', token);
  return new APIClient('https://queue.thaily.id.vn', () => token || null);
};