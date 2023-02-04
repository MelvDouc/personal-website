export default function Checkbox({ key, charsTypesObs }: {
  key: string;
  charsTypesObs: Obs<Set<string>>;
}) {
  const id = `checkbox-${key}`;

  return (
    <div className="password-generator-checkbox">
      <label htmlFor={id}>{key}</label>
      <input
        type="checkbox"
        id={id}
        className="form-check-input"
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