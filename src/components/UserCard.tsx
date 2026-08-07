import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  isSelected?: boolean;
  onSelect: (user: User) => void;
  onClear?: (user: User) => void;
  variant?: "default" | "compact";
}

function UserCard({ user, isSelected = false, onSelect, onClear, variant = "default" }: UserCardProps) {
  const handleClick = (): void => {
    if (isSelected) {
      onClear?.(user);
    } else {
      onSelect(user);
    }
  };

  const statusClass = user.isActive
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"
    : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
  const roleLabel = user.role === "security_admin" ? "Security Admin" : "Student";

  return (
    <article className={`rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-950 ${variant === "compact" ? "p-4" : ""} ${isSelected ? "ring-2 ring-brand-500/30" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{user.name}</h3>
          <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="font-medium">{roleLabel}</span>
            <span>{user.email}</span>
          </div>
        </div>

        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleClick}
          className="rounded-full border border-slate-300 bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          {isSelected ? "Unselect" : "Select"}
        </button>
      </div>
    </article>
  );
}

export default UserCard;
