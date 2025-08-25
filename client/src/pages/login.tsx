import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const auth = useAuth();
  const { toast } = useToast();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.login.mutateAsync({ username, password });
      toast({ title: "Logged in", description: `Signed in as ${username}` });
      setLocation("/");
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message || String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input placeholder="Username" value={username} onChange={(e: any) => setUsername(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
          <div className="flex justify-end">
            <Button className="btn-jobhai-primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
