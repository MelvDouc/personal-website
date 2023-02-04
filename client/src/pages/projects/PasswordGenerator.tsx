import { Observable } from "reactfree-jsx";
import {
  randomDigit,
  randomLowercase,
  randomUppercase,
  randomSpecialChar
} from "../../utils/random.js";

// TODO: copy password
export default function PasswordGenerator(): HTMLElement {
  const lengthObs = new Observable<number>(15);
  const passwordObs = new Observable<string>();
  const charsTypesObs = new Observable({
    lowercase: true,
    uppercase: true,
    digits: true,
    specialChars: false
  });
  const setPassword = () => {
    const options = optionKeys.filter((key) => charsTypesObs.getValue()[key]);
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
      </section>,
      <section className="password-generator__bottom">
        <div className="password-generator-form">
          <article>
            <input type="number" $init={(e) => initLengthInput(e, lengthObs)} />
            <input type="range" $init={(e) => initLengthInput(e, lengthObs)} />
          </article>
          <article>
            <div className="password-generator-form-checkboxes">
              {Object.keys(charsTypesObs.getValue()).map((key) => (
                <Checkbox key={key as keyof typeof randomCharFns} charsTypesObs={charsTypesObs} />
              ))}
            </div>
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

const optionKeys = [
  "lowercase",
  "uppercase",
  "digits",
  "specialChars"
];

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
  let password = "";

  while (password.length < length) {
    for (const option of options)
      password += randomCharFns[option as keyof typeof randomCharFns]();
  }

  return password
    .slice(0, length)
    .split("")
    .sort(() => Math.random() - .5)
    .join("");
}

function Checkbox({ key, charsTypesObs }: {
  key: keyof typeof randomCharFns;
  charsTypesObs: Observable<{ [x: string]: boolean; }>;
}) {
  <div className="password-generator-checkbox">
    <label id={`checkbox-${key}`}>{key}</label>
    <input
      type="checkbox"
      id={`checkbox-${key}`}
      checked={charsTypesObs.getValue()[key]}
      oninput={(e) => {
        charsTypesObs.updateValue((options) => {
          options[key] = (e.target as HTMLInputElement).checked;
          return options;
        });
      }}
    />
  </div>;
}