import router from "@routing/Router.jsx";

export default function HomePage() {
  return (
    <div className="page page-center">
      <section>
        <h1>A Website Bespoke And Exactly Your Size</h1>
      </section>
      <section className="fs-5">
        <div>
          <p className="mb-2">I'm a web developer based near Luxembourg City. I have worked with many technologies including Java and PHP. However, my passion lies in full-stack development with the versatile and ever-popular JavaScript language.</p>
          <p>My expertise allows me to create fast, modern, and scalable websites that are tailored to your needs. Whether you're looking for a sleek and minimalistic design, or a complex and dynamic web application, I will deliver high-quality results. If you're looking for a reliable and competent web dev, you've come to the right place. Together we'll bring your ideas to life!</p>
        </div>
      </section>
      <section>
        <div className="grid-center">
          <router.Link href={router.routes.CONTACT.url!} className="fs-5 btn btn-primary">Contact</router.Link>
        </div>
      </section>
    </div>
  );
}