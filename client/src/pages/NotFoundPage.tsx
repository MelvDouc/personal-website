import Router from "@routing/router.jsx";

export default function NotFoundPage() {
  return (
    <div className="page">
      <h1 className="fw-bold text-light mb-4">Page Not Found</h1>
      <p className="text-center">
        <Router.Link href={Router.routes.HOME.url} className="text-light">Home</Router.Link>
      </p>
    </div>
  );
}