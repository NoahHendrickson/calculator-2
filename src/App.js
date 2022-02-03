import { useReducer } from "react";
import NumberButton from "./NumberButton";
import OperationButton from "./OperationButton";
import "./App.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DEL_DIGIT: "del-digit",
  CLEAR_ALL: "clear-all",
  EVALUATE: "evaluate",
  CHOOSE_OPERATION: "choose-operation",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentNumber: `${currentNumber || ""}${payload.value}`,
      };
  }
}

function App() {
  const [{ currentNumber, previousNumber, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator">
      <div className="currentNumber">{currentNumber}</div>
      <div className="previousNumber">
        {previousNumber}
        {operation}
      </div>
      <div className="calcGrid">
        <button className="spanTwo" value="AC">
          AC
        </button>
        <OperationButton value="Del" />
        <OperationButton value="-" />
        <NumberButton value="1" dispatch={dispatch} />
        <NumberButton value="2" />
        <NumberButton value="3" />
        <OperationButton value="+" />
        <NumberButton value="4" />
        <NumberButton value="5" />
        <NumberButton value="6" />
        <OperationButton value="/" />
        <NumberButton value="7" />
        <NumberButton value="8" />
        <NumberButton value="9" />
        <OperationButton value="x" />
        <NumberButton value="0" />
        <NumberButton value="." />
        <button className="spanTwo" value="=">
          =
        </button>
      </div>
    </div>
  );
}

export default App;
export { reducer };
