import type { Item } from "../types/index";

interface ItemCardProps {
  item: Item;
  isClaimed?: boolean;
  onClaim?: (item: Item) => void;
  variant?: "default" | "compact";
}

function ItemCard({ item, isClaimed = false, onClaim, variant = "default" }: ItemCardProps) {
  const handleClick = (): void => {
    if (onClaim) onClaim(item);
  };

  const statusClass = item.isResolved
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"
    : "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-200";
  const buttonLabel = isClaimed ? "Claimed" : "Claim";
  const disabled = isClaimed || !onClaim;

  return (
    <article className={`rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-950 ${variant === "compact" ? "p-4" : ""} ${isClaimed ? "ring-2 ring-brand-500/30" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
          <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span>{item.category}</span>
            <span className="before:content-['•'] before:mr-2">{item.locationFound}</span>
          </div>
        </div>

        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
          {item.isResolved ? "Resolved" : "Open"}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">Found in {item.locationFound}</p>
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {buttonLabel}
        </button>
      </div>
    </article>
  );
}

export default ItemCard;
