import type { Item } from "../types/index";

interface ItemCardProps {
  item: Item;
  isClaimed?: boolean;
  onClaim?: (item: Item) => void;
}

function ItemCard({ item, isClaimed = false, onClaim }: ItemCardProps) {
  const handleClick = (): void => {
    if (onClaim) onClaim(item);
  };

  return (
    <div className="item-card" style={{ border: "1px solid #ccc", padding: "10px", margin: "4px 0", borderRadius: "6px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
        <div>
          <strong>{item.title}</strong>
          <div style={{ fontSize: "0.9rem", color: "#555" }}>
            {item.category} • {item.locationFound}
          </div>
        </div>
        <button onClick={handleClick}>{isClaimed ? "Claimed" : "Claim"}</button>
      </div>
    </div>
  );
}

export default ItemCard;