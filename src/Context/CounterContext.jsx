import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props) {
  return (
    <CounterContext.Provider value={{}}>
      {props.children}
    </CounterContext.Provider>
  );
}
  