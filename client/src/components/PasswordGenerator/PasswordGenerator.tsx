import { Observable } from "reactfree-jsx";
import displayAlterBox from "../AlertBox/AlertBox.jsx";
import SmallComponentWrapper from "../SmallComponentWrapper.jsx";
import Checkbox from "./Checkbox.jsx";
import {
  createPassword,
  isValidLength,
  randomCharFns
} from "./helpers.js";
import LengthInput from "./LengthInput.jsx";

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

  return <SmallComponentWrapper>
    <div
      className="w-100 w-max-page fs-4_5 border-rounded overflow-hidden"
      $init={() => lengthObs.notify()}
    >
      <section className="d-flex justify-content-center align-items-center p-2 bg-light-transparent text-green">
        <output
          className="fs-5 ff-monospace text-center word-break-all"
          $init={element => {
            passwordObs.subscribe(password => (element.innerText = password));
          }}
        ></output>
      </section>
      <section className="grid-center bg-white-transparent">
        <div className="w-100 h-100 p-3 gap-5 d-flex flex-column flex-nowrap text-dark">
          <article className="row gap-2">
            <div className="col-15" style={{ height: "1.8em" }}>
              <LengthInput
                type="number"
                className="w-100 h-100 px-1"
                lengthObs={lengthObs}
              />
            </div>
            <div className="col-85 d-flex align-items-center">
              <LengthInput
                type="range"
                className="w-100"
                lengthObs={lengthObs}
              />
            </div>
          </article>
          <article className="d-flex flex-column gap-3">
            {Object.keys(randomCharFns).map(key => (
              <Checkbox key={key} charsTypesObs={charsTypesObs} />
            ))}
          </article>
          <article className="d-flex justify-content-center align-items-center flex-wrap gap-2">
            <button
              className="btn btn-primary fs-inherit"
              onclick={() => lengthObs.notify()}
            >New Password</button>
            <button
              className="btn btn-primary fs-inherit"
              onclick={copyPassword}
            >Copy Password</button>
          </article>
        </div>
      </section>
    </div>
  </SmallComponentWrapper>;
}
