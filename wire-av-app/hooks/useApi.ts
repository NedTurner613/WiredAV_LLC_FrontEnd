import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/src/app/services/apiClient";
export function useApi<T>(initialUrl?: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(initialUrl));
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!initialUrl) return;

    setLoading(true);
    setError(null);

    try {
      const result = await apiClient.get<T>(initialUrl);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Fetch failed"));
    } finally {
      setLoading(false);
    }
  }, [initialUrl]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void fetchData();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchData]);

  const executeMutation = async <R, B>(
    action: (url: string, body?: B) => Promise<R>,
    url: string,
    body?: B,
    autoRefetch = true,
  ): Promise<R> => {
    setLoading(true);
    setError(null);

    try {
      const res = await action(url, body);
      if (autoRefetch && initialUrl) {
        await fetchData();
      }
      return res;
    } catch (err) {
      const caughtError =
        err instanceof Error ? err : new Error("Action failed");
      setError(caughtError);
      throw caughtError;
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    loading,
    error,
    refetch: fetchData,
    post: <R, B = unknown>(url: string, body?: B, autoRefetch = false) =>
      executeMutation<R, B>(apiClient.post, url, body, autoRefetch),

    patch: <R, B = unknown>(url: string, body?: B, autoRefetch = true) =>
      executeMutation<R, B>(apiClient.patch, url, body, autoRefetch),

    remove: <R>(url: string, autoRefetch = true) =>
      executeMutation<R, void>(
        () => apiClient.delete(url),
        url,
        undefined,
        autoRefetch,
      ),
  };
}
