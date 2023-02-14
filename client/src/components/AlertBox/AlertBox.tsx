import "./AlertBox.scss";

export default function displayAlterBox(props: Parameters<typeof AlertBox>[0]) {
  document.body.prepend(
    <AlertBox message={props.message} handleClose={props.handleClose} />
  );
}

function AlertBox({
  message,
  handleClose
}: {
  message: string;
  /**
   * Will run after the element has been removed.
   */
  handleClose?: VoidFunction;
}) {
  let remove: VoidFunction;
  const quit = (): void => {
    remove();
    handleClose && handleClose();
  };

  return (
    <div
      className="alert-box"
      $init={element => remove = () => element.remove()}
    >
      <form>
        <p>{message}</p>
        <button className="btn btn-primary" onclick={quit}>
          OK
        </button>
      </form>
    </div>
  );
}
