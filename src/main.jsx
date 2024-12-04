import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from "./components/DataProvider/DataProvider";
import { reducer, initialState } from "./Utility/reducer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </StrictMode>
);

// main.jsx  similar with  index.js -- component at higher level than app.jsx 