import type { Claim } from "../types/index";

interface ClaimBadgeProps {
  claim: Claim;
}

const ClaimBadge = ({ claim }: ClaimBadgeProps) => {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-600 dark:text-brand-300">Claim summary</p>
          <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">Ticket #{claim.id}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Filed by user #{claim.claimedByUserId}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-200">
          Submitted
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Item</p>
          <p className="mt-2 font-semibold">#{claim.itemId}</p>
        </div>
        <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Date</p>
          <p className="mt-2 font-semibold">{claim.claimedAt.toLocaleDateString()}</p>
        </div>
        <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Notes</p>
          <p className="mt-2 leading-6">{claim.notes ?? "No notes provided."}</p>
        </div>
      </div>
    </div>
  );
};

export default ClaimBadge;
