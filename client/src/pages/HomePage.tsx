import Router from "@routing/Router.jsx";

export default function HomePage() {
  return (
    <div className="page page-center">
      <section>
        <h1 data-trl="home-title"></h1>
      </section>
      <section className="fs-5">
        <div>
          <p className="mb-2" data-trl="home-intro1"></p>
          <p data-trl="home-intro2"></p>
        </div>
      </section>
      <section>
        <div className="grid-center">
          <Router.Link href={Router.routes.CONTACT.url} className="fs-5 btn btn-primary">Contact</Router.Link>
        </div>
      </section>
    </div>
  );
}