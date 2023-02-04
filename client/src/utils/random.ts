const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97));
const specialChars = "~#-|_@$£%*.?!";

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomLowercase(): string {
  return alphabet[randomInt(0, 26 - 1)];
}

export function randomUppercase(): string {
  return randomLowercase().toUpperCase();
}

export function randomDigit(): string {
  return String(randomInt(0, 9));
}

export function randomSpecialChar(): string {
  return specialChars[randomInt(0, specialChars.length - 1)];
}