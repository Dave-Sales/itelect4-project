import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Home</h2>
      <p className="mt-4">Welcome to the Campus Lost & Found Tracker.</p>
      <p className="mt-2">Go to <Link to="/about" className="text-brand-600">About</Link> or view an <Link to="/items/101" className="text-brand-600">item</Link>.</p>
    </div>
  );
}
