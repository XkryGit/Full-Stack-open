import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const handleDispatch = (type) => {
    store.dispatch({
      type: type,
    });
  };

  return (
    <div>
      <button onClick={() => handleDispatch("GOOD")}>good</button>
      <button onClick={() => handleDispatch("OK")}>ok</button>
      <button onClick={() => handleDispatch("BAD")}>bad</button>
      <button onClick={() => handleDispatch("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
