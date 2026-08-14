import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <nav className="border-b bg-white/90 p-4 dark:bg-slate-900/90">
        <div className="mx-auto max-w-7xl flex items-center gap-4 px-4">
          <Link to="/" className="font-semibold">Lost & Found</Link>
          <Link to="/about" className="text-sm text-slate-600">About</Link>
          <Link to="/login" className="ml-auto text-sm text-brand-600">Login</Link>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
