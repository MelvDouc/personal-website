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
      classObj={{
        "span-2": !!doubleCol
      }}
      onclick={handleClick}
    >
      {children}
    </button>
  );
}
