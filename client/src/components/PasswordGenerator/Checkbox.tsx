import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch.jsx";

export default function Checkbox({ key, charsTypesObs }: {
  key: string;
  charsTypesObs: Obs<Set<string>>;
}) {
  const id = `checkbox-${key}`;
  const charTypes = charsTypesObs.value;

  return (
    <div>
      <label className="text-transform-capitalize" htmlFor={id}>{key}</label>
      <ToggleSwitch
        id={id}
        checked={charTypes.has(key)}
        oninput={() => {
          charTypes.has(key)
            ? charTypes.delete(key)
            : charTypes.add(key);
          charsTypesObs.notify();
        }}
      />
    </div>
  );
}