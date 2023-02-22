import { Observable } from "reactfree-jsx";
import CalcButton from "./CalculatorButton.jsx";
import SmallComponentWrapper from "../SmallComponentWrapper.jsx";
import classes from "./Calculator.module.scss";

export default function Calculator() {
  const resultObs = new Observable("");
  const append = (value: string) => resultObs.updateValue(prev => prev + value);
  const compute = () =>
    resultObs.updateValue(prev => {
      try {
        return eval(prev) ?? "";
      } catch {
        return prev;
      }
    });
  const clear = () => resultObs.setValue("");
  const del = () => resultObs.updateValue(prev => prev.slice(0, -1));

  return (
    <SmallComponentWrapper>
      <div classNames={[classes.calculator, "w-100", "h-100", "border-rounded", "p-2", "g-2", "ff-monospace"]}>
        <section className="d-grid">
          <output
            className="fw-700 fs-8 grid-center p-1 overflow-x-auto word-break-all text-green"
            $init={element => {
              resultObs.subscribe(value => element.innerText = value);
            }}
          ></output>
        </section>
        <section className={classes.calculatorBottom}>
          <div className={classes.calculatorRow}>
            <CalcButton handleClick={clear}>C</CalcButton>
            <CalcButton handleClick={() => append("%")}>%</CalcButton>
            <CalcButton handleClick={del}>&#10232;</CalcButton>
            <CalcButton handleClick={() => append("/")}>/</CalcButton>
          </div>
          <div className={classes.calculatorRow}>
            <CalcButton handleClick={() => append("7")}>7</CalcButton>
            <CalcButton handleClick={() => append("8")}>8</CalcButton>
            <CalcButton handleClick={() => append("9")}>9</CalcButton>
            <CalcButton handleClick={() => append("*")}>*</CalcButton>
          </div>
          <div className={classes.calculatorRow}>
            <CalcButton handleClick={() => append("4")}>4</CalcButton>
            <CalcButton handleClick={() => append("5")}>5</CalcButton>
            <CalcButton handleClick={() => append("6")}>6</CalcButton>
            <CalcButton handleClick={() => append("-")}>-</CalcButton>
          </div>
          <div className={classes.calculatorRow}>
            <CalcButton handleClick={() => append("1")}>1</CalcButton>
            <CalcButton handleClick={() => append("2")}>2</CalcButton>
            <CalcButton handleClick={() => append("3")}>3</CalcButton>
            <CalcButton handleClick={() => append("+")}>+</CalcButton>
          </div>
          <div className={classes.calculatorRow}>
            <CalcButton handleClick={() => append(".")}>.</CalcButton>
            <CalcButton handleClick={() => append("0")}>0</CalcButton>
            <CalcButton handleClick={compute} doubleCol>=</CalcButton>
          </div>
        </section>
      </div>
    </SmallComponentWrapper>
  );
}
