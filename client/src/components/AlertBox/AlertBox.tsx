import classes from "./AlertBox.module.scss";

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
  let alertBoxContainer: HTMLElement;
  const quit = () => {
    alertBoxContainer.remove();
    handleClose && handleClose();
  };

  return (
    <div
      className={classes.alertBoxContainer}
      $init={(element) => {
        alertBoxContainer = element;
        const handleEnter = (e: KeyboardEvent) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          quit();
          document.removeEventListener("keydown", handleEnter);
        };
        document.addEventListener("keydown", handleEnter);
      }}
    >
      <div className={classes.alertBox}>
        <p>{message}</p>
        <button
          classes={{
            btn: true,
            "btn-primary": !type || type === "primary",
            "btn-danger": type === "danger",
          }}
          type="button"
          onclick={quit}
        >OK</button>
      </div>
    </div>
  );
}


type ButtonColor = "primary" | "danger";