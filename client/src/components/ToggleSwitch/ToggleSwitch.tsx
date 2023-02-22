import classes from "./ToggleSwitch.module.scss";

export default function ToggleSwitch({ $init }: {
  $init?: (label: HTMLLabelElement) => void;
}) {
  return (
    <label className={classes.switch} $init={(label) => $init && $init(label)}>
      <input type="checkbox" />
      <span className={classes.switchSlider}></span>
    </label>
  );
}