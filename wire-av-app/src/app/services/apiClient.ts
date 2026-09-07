import { createClient } from "@/lib/supabaseClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Get the authentication header for the API request
 * @returns The authentication header
 */
async function getAuthHeader(): Promise<Record<string, string>> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    return { Authorization: `Bearer ${session.access_token}` };
  }
  return {};
}

/**
 * Make a request to the API
 * @param endpoint The endpoint to request
 * @param options The options for the request
 * @returns The response from the API
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const authHeaders = await getAuthHeader();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}: ${response.statusText}`,
    );
  }
  return response.json() as Promise<T>;
}

/**
 * The API client
 * @returns The API client
 */
export const apiClient = {
  get: <T>(url: string, headers?: HeadersInit) =>
    request<T>(url, { method: "GET", headers }),

  /**
   * Make a POST request to the API
   * @param url The URL to request
   * @param body The body of the request
   * @param headers The headers for the request
   * @returns The response from the API
   */
  post: <T, B = unknown>(url: string, body?: B, headers?: HeadersInit) =>
    request<T>(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }),

  /**
   * Make a PATCH request to the API
   * @param url The URL to request
   * @param body The body of the request
   * @param headers The headers for the request
   * @returns The response from the API
   */
  patch: <T, B = unknown>(url: string, body?: B, headers?: HeadersInit) =>
    request<T>(url, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }),

  /**
   * Make a DELETE request to the API
   * @param url The URL to request
   * @param headers The headers for the request
   * @returns The response from the API
   */
  delete: <T>(url: string, headers?: HeadersInit) =>
    request<T>(url, { method: "DELETE", headers }),
};
