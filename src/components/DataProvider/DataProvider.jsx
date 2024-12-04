import React, { createContext, useReducer } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
        {/* The children can consume values passed via use reducer with reducer and initial state provided; these values should be passed to the DataProvider along with children */}
      {children}
    </DataContext.Provider>
  );
};

// Import DataProcider into the higher component  // main.jsx  similar with  index.js -- component at higher level than app.jsx 