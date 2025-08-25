import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Build a safe URL from the queryKey.
    // Expected queryKey formats used across the app:
    // - ["/api/jobs"]
    // - ["/api/jobs", id]
    // - ["/api/jobs", { search, cityId, ... }]
    const [base, params] = queryKey as unknown[];
    if (typeof base !== "string") {
      throw new Error("Invalid queryKey: base must be a string");
    }

    let url = base;

    if (params !== undefined && params !== null) {
      const t = typeof params;
      if (t === "string" || t === "number" || t === "boolean") {
        // treat as path segment
        url = `${url}/${encodeURIComponent(String(params))}`;
      } else if (t === "object") {
        // treat as query params (ignore null/undefined values)
        const entries = Object.entries(params as Record<string, unknown>)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]) as [string, string][];
        if (entries.length > 0) {
          url = `${url}?${new URLSearchParams(entries).toString()}`;
        }
      } else {
        // fallback: append as encoded string
        url = `${url}/${encodeURIComponent(String(params))}`;
      }
    }

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
