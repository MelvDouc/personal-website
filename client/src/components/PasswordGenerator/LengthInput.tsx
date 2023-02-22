import { isValidLength, MAX_LENGTH, MIN_LENGTH } from "./helpers.js";

export default function LengthInput({ type, className, lengthObs }: {
  type: "number" | "range";
  lengthObs: Obs<number>;
  className: string;
}) {
  return (
    <input
      type={type}
      className={className}
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