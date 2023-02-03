export default class PasswordGenerator extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "closed" });

    shadowRoot.append(
      <section className="password-generator__top">
        <output></output>
      </section>,
      <section className="password-generator__bottom">
        <div className="password-generator-form">
          <article>
            <input type="number" />
            <input type="range" />
          </article>
          <article>
            <div className="password-generator-form-checkboxes"></div>
          </article>
          <article>
            <button>New Password</button>
            <button>Copy Password</button>
          </article>
        </div>
      </section>
    );
  }
}

customElements.define("password-generator", PasswordGenerator);