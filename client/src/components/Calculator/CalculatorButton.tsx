export default function CalculatorButton({
  handleClick,
  doubleCol,
  children
}: {
  handleClick: () => void;
  doubleCol?: boolean;
  children?: any;
}) {
  const classNames = ["calculator-button"];
  if (doubleCol) classNames.push("span-2");

  return (
    <button classNames={classNames} onclick={handleClick}>
      {children}
    </button>
  );
}
