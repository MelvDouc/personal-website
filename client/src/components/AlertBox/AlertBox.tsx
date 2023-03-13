import cssClasses from "./AlertBox.module.scss";

export default function displayAlterBox(props: Parameters<typeof AlertBox>[0]) {
  document.body.prepend(
    <AlertBox
      message={props.message}
      type={props.type}
      handleClose={props.handleClose}
    />
  );
}

function AlertBox({ message, type, handleClose }: {
  message: string;
  type?: ButtonColor;
  /**
   * Will run after the element has been removed.
   */
  handleClose?: VoidFunction;
}) {
  return (
    <div
      className={cssClasses.alertBoxContainer}
      $init={(element) => initAlertBox(element, handleClose)}
    >
      <div className={cssClasses.alertBox}>
        <p>{message}</p>
        <button
          classes={{
            btn: true,
            "btn-primary": !type || type === "primary",
            "btn-danger": type === "danger",
          }}
          type="button"
        >OK</button>
      </div>
    </div>
  );
}

function initAlertBox(element: HTMLElement, handleClose: VoidFunction | undefined) {
  const quit = () => {
    element.remove();
    handleClose && handleClose();
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    quit();
    document.removeEventListener("keydown", handleEnter);
  };

  element.addEventListener("click", ({ target }) => {
    if (target instanceof HTMLElement && target.classList.contains("btn"))
      quit();
  });
  document.addEventListener("keydown", handleEnter);
}

type ButtonColor = "primary" | "danger";