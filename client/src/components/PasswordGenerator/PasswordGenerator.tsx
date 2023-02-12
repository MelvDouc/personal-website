import { Observable } from "reactfree-jsx";
import SmallComponentWrapper from "../SmallComponentWrapper.jsx";
import Checkbox from "./Checkbox.jsx";
import {
  createPassword,
  initLengthInput,
  isValidLength,
  randomCharFns
} from "./helpers.js";
import "./PasswordGenerator.scss";

export default function PasswordGenerator(): HTMLElement {
  const lengthObs = new Observable<number>(15);
  const passwordObs = new Observable<string>();
  const charsTypesObs = new Observable(
    new Set(["lowercase", "uppercase", "digits"])
  );
  const setPassword = () => {
    const options = charsTypesObs.getValue();
    const length = lengthObs.getValue();

    if (isValidLength(length) && options.size > 0)
      passwordObs.setValue(createPassword(length, options));
  };

  charsTypesObs.subscribe(setPassword);
  lengthObs.subscribe(setPassword);

  const passwordGenerator = (
    <div className="password-generator">
      <section className="password-generator__top">
        <output
          $init={element => {
            passwordObs.subscribe(password => (element.innerText = password));
          }}
        ></output>
      </section>
      <section className="password-generator__bottom">
        <div className="password-generator-form form-check form-switch">
          <article className="password-generator-length-inputs">
            <div>
              <input type="number" $init={e => initLengthInput(e, lengthObs)} />
            </div>
            <div>
              <input type="range" $init={e => initLengthInput(e, lengthObs)} />
            </div>
          </article>
          <article className="d-flex flex-column gap-3">
            {Object.keys(randomCharFns).map(key => (
              <Checkbox key={key} charsTypesObs={charsTypesObs} />
            ))}
          </article>
          <article className="d-flex justify-content-center align-items-center flex-wrap gap-2">
            <button
              className="btn btn-primary"
              onclick={() => lengthObs.notify()}
            >
              New Password
            </button>
            <button
              className="btn btn-primary"
              onclick={async () => {
                if (!navigator.clipboard) return;
                await navigator.clipboard.writeText(passwordObs.getValue());
                alert("Copied!");
              }}
            >
              Copy Password
            </button>
          </article>
        </div>
      </section>
    </div>
  );

  lengthObs.notify();
  return <SmallComponentWrapper>{passwordGenerator}</SmallComponentWrapper>;
}
