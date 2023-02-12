import {
  randomDigit,
  randomLowercase,
  randomUppercase,
  randomSpecialChar
} from "../../utils/random.js";

const MIN_LENGTH = 1;
const MAX_LENGTH = 50;

export const randomCharFns = {
  lowercase: randomLowercase,
  uppercase: randomUppercase,
  digits: randomDigit,
  specialChars: randomSpecialChar
} as const;

export function isValidLength(length: number) {
  return length >= MIN_LENGTH && length <= MAX_LENGTH;
}

export function initLengthInput(
  input: HTMLInputElement,
  lengthObs: Obs<number>
) {
  input.min = String(MIN_LENGTH);
  input.max = String(MAX_LENGTH);
  input.oninput = () => {
    const value = input.valueAsNumber;
    if (isValidLength(value)) lengthObs.setValue(value);
  };
  lengthObs.subscribe(length => {
    if (length !== input.valueAsNumber) input.value = String(length);
  });
}

export function createPassword(length: number, options: Set<string>) {
  const password: string[] = [];

  while (password.length < length) {
    for (const option of options) {
      password.push(randomCharFns[option]());
    }
  }

  return password
    .slice(0, length)
    .sort(() => Math.random() - 0.5)
    .join("");
}
