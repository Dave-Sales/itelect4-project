import { useParams } from "react-router-dom";

export default function ItemDetail() {
  const params = useParams();
  const id = params.itemId ?? "unknown";

  return (
    <div>
      <h2 className="text-2xl font-semibold">Item Detail</h2>
      <p className="mt-4">Viewing item ID: {id}</p>
    </div>
  );
}
