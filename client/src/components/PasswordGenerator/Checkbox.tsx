import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch.jsx";

export default function Checkbox({ key, charsTypesObs }: {
  key: string;
  charsTypesObs: Obs<Set<string>>;
}) {
  const id = `checkbox-${key}`;

  return (
    <div>
      <label className="text-transform-capitalize" htmlFor={id}>{key.replace(/\-+/g, " ")}</label>
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