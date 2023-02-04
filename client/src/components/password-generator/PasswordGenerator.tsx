import { Observable } from "reactfree-jsx";
import {
  randomDigit,
  randomLowercase,
  randomUppercase,
  randomSpecialChar
} from "../../utils/random.js";
import Checkbox from "./Checkbox.jsx";
import "./PasswordGenerator.scss";

// TODO: copy password
export default function PasswordGenerator(): HTMLElement {
  const lengthObs = new Observable<number>(15);
  const passwordObs = new Observable<string>();
  const charsTypesObs = new Observable(
    new Set<keyof typeof randomCharFns>(["lowercase", "uppercase", "digits"])
  );
  const setPassword = () => {
    const options = [...charsTypesObs.getValue()];
    const length = lengthObs.getValue();

    if (length >= MIN_LENGTH && length <= MAX_LENGTH && options.length > 0)
      passwordObs.setValue(createPassword(length, options));
  };

  charsTypesObs.subscribe(setPassword);
  lengthObs.subscribe(setPassword);

  const passwordGenerator = (
    <div className="password-generator">
      <section className="password-generator__top">
        <output $init={(element) => {
          passwordObs.subscribe((password) => element.innerText = password);
        }}></output>
      </section>
      <section className="password-generator__bottom">
        <div className="password-generator-form">
          <article className="password-generator-length-inputs">
            <div><input type="number" $init={(e) => initLengthInput(e, lengthObs)} /></div>
            <div><input type="range" $init={(e) => initLengthInput(e, lengthObs)} /></div>
          </article>
          <article>
            {Object.keys(randomCharFns).map((key) => (
              <Checkbox key={key} charsTypesObs={charsTypesObs} />
            ))}
          </article>
          <article>
            <button onclick={() => lengthObs.notify()}>New Password</button>
            <button>Copy Password</button>
          </article>
        </div>
      </section>
    </div>
  );

  lengthObs.notify();
  return passwordGenerator;
}

const randomCharFns = {
  lowercase: randomLowercase,
  uppercase: randomUppercase,
  digits: randomDigit,
  specialChars: randomSpecialChar
} as const;

const MIN_LENGTH = 1;
const MAX_LENGTH = 50;

function initLengthInput(input: HTMLInputElement, lengthObs: Observable<number>) {
  input.min = String(MIN_LENGTH);
  input.max = String(MAX_LENGTH);
  input.oninput = () => {
    const value = input.valueAsNumber;
    if (value >= MIN_LENGTH && value <= MAX_LENGTH)
      lengthObs.setValue(value);
  };
  lengthObs.subscribe((length) => {
    if (length !== input.valueAsNumber)
      input.value = String(length);
  });
}

function createPassword(length: number, options: string[]) {
  const password: string[] = [];

  while (password.length < length) {
    for (const option of options)
      password.push(randomCharFns[option]());
  }

  return password
    .sort(() => Math.random() - .5)
    .slice(0, length)
    .join("");
}