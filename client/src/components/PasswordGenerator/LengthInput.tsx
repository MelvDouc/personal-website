import { isValidLength, MAX_LENGTH, MIN_LENGTH } from "./helpers.js";

export default function LengthInput({ type, lengthObs }: {
  type: "number" | "range";
  lengthObs: Obs<number>;
}) {
  return (
    <input
      type={type}
      min={String(MIN_LENGTH)}
      max={String(MAX_LENGTH)}
      oninput={(e) => {
        const length = (e.target as HTMLInputElement).valueAsNumber;
        if (isValidLength(length))
          lengthObs.value = length;
      }}
      value={lengthObs}
    />
  );
}