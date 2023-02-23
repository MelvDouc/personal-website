export default function CalculatorButton({
  handleClick,
  doubleCol,
  children
}: {
  handleClick: () => void;
  doubleCol?: boolean;
  children?: any;
}) {
  return (
    <button
      classes={{
        "span-2": !!doubleCol
      }}
      onclick={handleClick}
    >
      {children}
    </button>
  );
}
