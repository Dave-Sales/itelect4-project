import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth";

type Props = { children: React.ReactElement };

export default function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((s) => s.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
