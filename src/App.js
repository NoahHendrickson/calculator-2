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
        currentNumber: `${state.currentNumber || ""}${payload.digit}`,
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
      <div className="display">
        <div className="currentNumber">{currentNumber}</div>
        <div className="previousNumber">
          {previousNumber}
          {operation}
        </div>
      </div>
      <div className="calcGrid">
        <button className="spanTwo" operation="AC">
          AC
        </button>
        <OperationButton operation="Del" />
        <OperationButton operation="-" />
        <NumberButton digit="1" dispatch={dispatch} />
        <NumberButton digit="2" dispatch={dispatch} />
        <NumberButton digit="3" dispatch={dispatch} />
        <OperationButton operation="+" />
        <NumberButton digit="4" dispatch={dispatch} />
        <NumberButton digit="5" dispatch={dispatch} />
        <NumberButton digit="6" dispatch={dispatch} />
        <OperationButton operation="/" />
        <NumberButton digit="7" dispatch={dispatch} />
        <NumberButton digit="8" dispatch={dispatch} />
        <NumberButton digit="9" dispatch={dispatch} />
        <OperationButton operation="x" />
        <NumberButton digit="0" dispatch={dispatch} />
        <NumberButton digit="." dispatch={dispatch} />
        <button className="spanTwo" operation="=">
          =
        </button>
      </div>
    </div>
  );
}

export default App;
export { reducer };
