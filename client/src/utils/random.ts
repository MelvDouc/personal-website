const charCodes = {
  LOWERCASE: [97, 122],
  UPPERCASE: [65, 90],
} as const;

const specialChars = "~#-|_@$£%*.?!";

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomLowercase(): string {
  return String.fromCharCode(randomInt(...charCodes.LOWERCASE));
}

export function randomUppercase(): string {
  return String.fromCharCode(randomInt(...charCodes.UPPERCASE));
}

export function randomDigit(): string {
  return String(randomInt(0, 9));
}

export function randomSpecialChar(): string {
  return specialChars[randomInt(0, specialChars.length - 1)];
}