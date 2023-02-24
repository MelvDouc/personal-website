import Link from "../components/Link.jsx";

export default function NotFoundPage() {
  return (
    <div className="page">
      <p className="fw-bold text-light">Page Not Found.</p>
      <p><Link href="/" className="text-light">Home</Link></p>
    </div>
  );
}