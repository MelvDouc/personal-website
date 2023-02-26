import { Observable } from "reactfree-jsx";
import displayAlterBox from "@/components/AlertBox/AlertBox.jsx";
import SmallComponentWrapper from "@/components/SmallComponentWrapper.jsx";
import Checkbox from "./Checkbox.jsx";
import {
  createPassword,
  isValidLength,
  randomCharFns
} from "./helpers.js";
import LengthInput from "./LengthInput.jsx";
import cssClasses from "./PasswordGenerator.module.scss";

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
  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(passwordObs.getValue());
      displayAlterBox({ message: "Password was copied!" });
    } catch (error) {
      displayAlterBox({ message: "Interacting with the clipboard is disallowed on this browser." });
    }
  };

  charsTypesObs.subscribe(setPassword);
  lengthObs.subscribe(setPassword);

  return (
    <SmallComponentWrapper>
      <div
        className={cssClasses.passwordGenerator}
        $init={() => lengthObs.notify()}
      >
        <section>
          <output
            $init={(element) => {
              passwordObs.subscribe((password) => element.innerText = password);
            }}
          ></output>
        </section>
        <section>
          <div className={cssClasses.form}>
            <article className={cssClasses.inputs}>
              <div>
                <LengthInput type="number" lengthObs={lengthObs} />
              </div>
              <div className="grid-center">
                <LengthInput type="range" lengthObs={lengthObs} />
              </div>
            </article>
            <article className={cssClasses.checkboxes}>
              {Object.keys(randomCharFns).map(key => (
                <Checkbox key={key} charsTypesObs={charsTypesObs} />
              ))}
            </article>
            <article className={cssClasses.buttons}>
              <button
                className="btn btn-primary"
                onclick={() => lengthObs.notify()}
              >New Password</button>
              <button
                className="btn btn-primary"
                onclick={copyPassword}
              >Copy Password</button>
            </article>
          </div>
        </section>
      </div>
    </SmallComponentWrapper>
  );
}
