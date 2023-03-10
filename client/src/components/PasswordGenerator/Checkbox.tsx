import ToggleSwitch from "@components/ToggleSwitch/ToggleSwitch.jsx";

export default function Checkbox({ key, selectedOptionsObs }: {
  key: string;
  selectedOptionsObs: Obs<Set<string>>;
}) {
  const id = `checkbox-${key}`;
  const selectedOptions = selectedOptionsObs.value;

  return (
    <div>
      <label className="text-transform-capitalize" htmlFor={id}>{key}</label>
      <ToggleSwitch
        id={id}
        checked={selectedOptions.has(key)}
        oninput={() => {
          selectedOptions.has(key)
            ? selectedOptions.delete(key)
            : selectedOptions.add(key);
          selectedOptionsObs.notify();
        }}
      />
    </div>
  );
}