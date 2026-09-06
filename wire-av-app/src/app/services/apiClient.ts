import { createClient } from "@/lib/supabaseClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

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

export const apiClient = {
  get: <T>(url: string, headers?: HeadersInit) =>
    request<T>(url, { method: "GET", headers }),

  post: <T, B = unknown>(url: string, body?: B, headers?: HeadersInit) =>
    request<T>(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }),

  patch: <T, B = unknown>(url: string, body?: B, headers?: HeadersInit) =>
    request<T>(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }),

  delete: <T>(url: string, headers?: HeadersInit) =>
    request<T>(url, { method: "DELETE", headers }),
};
