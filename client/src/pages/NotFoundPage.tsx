import Router from "@routing/router.jsx";

export default function NotFoundPage() {
  return (
    <div className="page">
      <p className="fw-bold text-light">Page Not Found.</p>
      <p><Router.Link href={Router.routes.HOME.url!} className="text-light">Home</Router.Link></p>
    </div>
  );
}