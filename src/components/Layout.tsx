import { type ChangeEvent, type RefObject } from "react";
import { Link, Outlet } from "react-router-dom";
import ItemCard from "./ItemCard";
import UserCard from "./UserCard";
import { useUiStore } from "../stores/ui";
import type { Claim, Item, User } from "../types/index";

interface LayoutProps {
  searchTerm: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onCreateClaim?: () => void;
  isCreateClaimDisabled?: boolean;
  claims?: Claim[];
  items?: Item[];
  users?: User[];
  isLoading?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  searchInputRef?: RefObject<HTMLInputElement | null>;
}

export default function Layout({
  searchTerm,
  onSearchChange,
  isDarkMode,
  onToggleDarkMode,
  onCreateClaim,
  isCreateClaimDisabled = true,
  claims = [],
  items = [],
  users = [],
  isLoading = false,
  hasError = false,
  errorMessage,
  searchInputRef,
}: LayoutProps) {
  const { selectedUserId, selectedItemId, setSelectedUserId, setSelectedItemId } = useUiStore();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <nav className="border-b bg-white/90 p-4 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4">
          <Link to="/" className="font-semibold">Lost & Found</Link>
          <Link to="/about" className="text-sm text-slate-600 dark:text-slate-300">About</Link>
          <Link to="/login" className="ml-auto text-sm text-brand-600">Login</Link>
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {isDarkMode ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Data status</p>
            <div className="mt-1 flex items-center gap-2 text-sm">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span>{isLoading ? "Loading" : hasError ? "Error" : "Ready"}</span>
            </div>
          </div>

          <div className="flex w-full max-w-md items-center gap-3">
            <input
              ref={searchInputRef}
              type="search"
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search items and users"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950"
            />
            {onCreateClaim ? (
              <button
                type="button"
                onClick={onCreateClaim}
                disabled={isCreateClaimDisabled}
                className="rounded-xl bg-brand-600 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                Claim
              </button>
            ) : null}
          </div>
        </div>

        {hasError ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">
            {errorMessage ?? "Unable to load data."}
          </div>
        ) : null}

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Users</p>
            <p className="mt-2 text-2xl font-bold">{users.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Items</p>
            <p className="mt-2 text-2xl font-bold">{items.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Claims</p>
            <p className="mt-2 text-2xl font-bold">{claims.length}</p>
          </div>
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Users</h2>
              {selectedUserId !== null ? (
                <button
                  type="button"
                  onClick={() => setSelectedUserId(null)}
                  className="text-sm font-medium text-brand-600"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div className="space-y-3">
              {users.length === 0 ? (
                <p className="text-sm text-slate-500">No users found.</p>
              ) : (
                users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    isSelected={selectedUserId === user.id}
                    onSelect={(nextUser) => setSelectedUserId(nextUser.id)}
                    onClear={() => setSelectedUserId(null)}
                    variant="compact"
                  />
                ))
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Items</h2>
              {selectedItemId !== null ? (
                <button
                  type="button"
                  onClick={() => setSelectedItemId(null)}
                  className="text-sm font-medium text-brand-600"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div className="space-y-3">
              {items.length === 0 ? (
                <p className="text-sm text-slate-500">No items found.</p>
              ) : (
                items.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isClaimed={selectedItemId === item.id}
                    onClaim={(nextItem) => {
                      setSelectedItemId(selectedItemId === nextItem.id ? null : nextItem.id);
                    }}
                    variant="compact"
                  />
                ))
              )}
            </div>
          </section>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
