import classes from "./ToggleSwitch.module.scss";

export default function ToggleSwitch({ id, checked, oninput }: {
  id?: string;
  checked?: boolean;
  oninput?: (e: Event) => void;
}) {
  return (
    <label className={classes.switch}>
      <input
        type="checkbox"
        $init={(input) => {
          if (typeof id === "string")
            input.id = id;
          input.checked = !!checked;
          if (oninput)
            input.oninput = oninput;
        }}
      />
      <span className={classes.slider}></span>
    </label>
  );
}