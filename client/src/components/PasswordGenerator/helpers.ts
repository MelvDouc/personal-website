import {
  randomDigit,
  randomLowercase,
  randomUppercase,
  randomSpecialChar
} from "../../utils/random.js";

export const MIN_LENGTH = 1;
export const MAX_LENGTH = 50;

export const randomCharFns = {
  lowercase: randomLowercase,
  uppercase: randomUppercase,
  digits: randomDigit,
  "special-characters": randomSpecialChar
} as const;

export function isValidLength(length: number) {
  return length >= MIN_LENGTH && length <= MAX_LENGTH;
}

export function createPassword(length: number, options: Set<string>) {
  const password: string[] = [];

  while (password.length < length) {
    for (const option of options) {
      password.push(randomCharFns[option]());
    }
  }

  return password
    .sort(() => Math.random() - 0.5)
    .slice(0, length)
    .join("");
}
