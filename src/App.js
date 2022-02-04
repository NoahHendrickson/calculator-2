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
      if (payload.digit === "0" && state.currentNumber === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentNumber == null) {
        return {
          currentNumber: payload.digit,
        };
      }
      if (payload.digit === "." && state.currentNumber.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentNumber: `${state.currentNumber || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR_ALL:
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentNumber == null && state.previousNumber == null) {
        return state;
      }
      if (state.previousNumber == null) {
        return {
          ...state,
          operation: payload.operation,
          previousNumber: state.currentNumber,
          currentNumber: null,
        };
      }
      return {
        previousNumber: evaluate(state),
        operation: payload.operation,
      };
      return {};
    case ACTIONS.EVALUATE:
      if (state.currentNumber == null && state.previousNumber == null) {
        return state;
      }
      return {
        ...state,
        currentNumber: evaluate(state),
        previousNumber: null,
        operation: null,
      };
    case ACTIONS.DEL_DIGIT:
      return {
        ...state,
        currentNumber: state.currentNumber.slice(0, -1),
      };
  }
}

function evaluate({ currentNumber, previousNumber, operation }) {
  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);
  let answer;
  switch (operation) {
    case "-":
      answer = prev - current;
      break;
    case "+":
      answer = prev + current;
      break;
    case "*":
      answer = prev * current;
      break;
    case "÷":
      answer = prev / current;
      break;
  }
  return answer.toString();
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
        <button
          onClick={() => dispatch({ type: ACTIONS.CLEAR_ALL })}
          className="spanTwo"
          operation="AC"
        >
          AC
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.DEL_DIGIT })}
          operation="DEL"
        >
          DEL
        </button>
        <OperationButton operation="-" dispatch={dispatch} />
        <NumberButton digit="1" dispatch={dispatch} />
        <NumberButton digit="2" dispatch={dispatch} />
        <NumberButton digit="3" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <NumberButton digit="4" dispatch={dispatch} />
        <NumberButton digit="5" dispatch={dispatch} />
        <NumberButton digit="6" dispatch={dispatch} />
        <OperationButton operation="÷" dispatch={dispatch} />
        <NumberButton digit="7" dispatch={dispatch} />
        <NumberButton digit="8" dispatch={dispatch} />
        <NumberButton digit="9" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <NumberButton digit="0" dispatch={dispatch} />
        <NumberButton digit="." dispatch={dispatch} />
        <button
          className="spanTwo"
          operation="="
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
export { reducer };
