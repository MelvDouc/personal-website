import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

export default function Checkbox({ key, charsTypesObs }: {
  key: string;
  charsTypesObs: Obs<Set<string>>;
}) {
  const id = `checkbox-${key}`;

  return (
    <div className="d-flex justify-content-between align-items-center">
      <label className="text-light text-transform-capitalize" htmlFor={id}>{key.replace(/\-+/g, " ")}</label>
      <ToggleSwitch
        id={id}
        checked={charsTypesObs.getValue().has(key)}
        oninput={() => {
          charsTypesObs.updateValue((options) => {
            options.has(key) ? options.delete(key) : options.add(key);
            return options;
          });
        }}
      />
    </div>
  );
}