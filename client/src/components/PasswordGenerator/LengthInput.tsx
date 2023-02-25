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
        const value = (e.target as HTMLInputElement).valueAsNumber;
        if (isValidLength(value))
          lengthObs.setValue(value);
      }}
      $init={(input) => {
        lengthObs.subscribe(length => {
          if (length !== input.valueAsNumber)
            input.value = String(length);
        });
      }}
    />
  );
}