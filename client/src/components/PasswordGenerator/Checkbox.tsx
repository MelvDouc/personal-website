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
        checked={charsTypesObs.value.has(key)}
        oninput={() => {
          charsTypesObs.value.has(key)
            ? charsTypesObs.value.delete(key)
            : charsTypesObs.value.add(key);
          charsTypesObs.notify();
        }}
      />
    </div>
  );
}