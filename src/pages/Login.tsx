import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login("fake-token-123", { name: username });
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Login</h2>
      <form onSubmit={handleSubmit} className="mt-4 max-w-sm">
        <label className="block text-sm font-medium">Name</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-2 w-full rounded border px-3 py-2" />
        <button type="submit" className="mt-4 rounded bg-brand-600 px-4 py-2 text-white">Login</button>
      </form>
    </div>
  );
}
