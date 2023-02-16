import router from "../routing/router.js";

export default class Link extends HTMLAnchorElement {
  #pathname: string;

  constructor({ href, className }: {
    href: string;
    className?: string;
  }) {
    super();
    this.href = href;
    this.#pathname = href;
    if (className)
      this.className = className;

    this.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState({}, "", this.href);
      router.setUrl(this.#pathname);
    });
  }
}

customElements.define("a-link", Link, { extends: "a" });