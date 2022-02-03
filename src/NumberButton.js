import React from "react";
import ACTIONS from "./App.js";

function NumberButton({ dispatch, value }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { value } })}
    >
      {value}
    </button>
  );
}

export default NumberButton;
