import Link from "../components/Link.jsx";

export default function NotFoundPage() {
  return (
    <div>
      <p className="fw-bold">Page Not Found.</p>
      <p><Link href="/">Home</Link></p>
    </div>
  );
}