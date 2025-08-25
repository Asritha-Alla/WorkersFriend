import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: me } = useQuery({
    queryKey: ["/api/me"],
    queryFn: async () => {
      const res = await fetch("/api/me", { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/login", { username, password });
      return res.json();
    },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/me"] }),
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/logout");
      return res.json();
    },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/me"] }),
  });

  return {
    user: (me as any)?.user || null,
    login: loginMutation,
    logout: logoutMutation,
    isLoading: false,
  };
}
