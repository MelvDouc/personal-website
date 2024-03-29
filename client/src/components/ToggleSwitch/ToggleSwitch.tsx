import { Observable } from "reactfree-jsx";
import classes from "./ToggleSwitch.module.scss";

export default function ToggleSwitch({ id, checked, disabled, oninput }: {
  id?: string;
  checked?: boolean;
  disabled?: PossibleObs<boolean>;
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
          if (disabled !== undefined) {
            if (disabled instanceof Observable) {
              input.disabled = disabled.value;
              disabled.subscribe((value) => input.disabled = value);
              return;
            }
            input.disabled = disabled as boolean;
          }
        }}
      />
      <span className={classes.slider}></span>
    </label>
  );
}