import type { Item } from "../types/index";

interface ItemCardProps {
  item: Item;
  onClaim?: (item: Item) => void;
}

function ItemCard({ item, onClaim }: ItemCardProps) {
  const handleClick = (): void => {
    if (onClaim) onClaim(item);
  };

  return (
    <div className="item-card" style={{ border: "1px solid #ccc", padding: "12px", margin: "8px" }}>
      <h3>{item.title}</h3>
      <p>Category: {item.category}</p>
      <p>Location Found: {item.locationFound}</p>
      <p>Status: {item.isResolved ? "Resolved" : "Unclaimed"}</p>
      <button onClick={handleClick}>File Claim</button>
    </div>
  );
}

export default ItemCard;