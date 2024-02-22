import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import DataContext from "./components/Context/DataContext";
import { BrowserRouter } from "react-router-dom";

// ReactDOM.render(
//   <StrictMode>
//     <DataContext>
//       <App />
//     </DataContext>
//   </StrictMode>,
//   document.getElementById("root")
// );

const domNode = document.getElementById("root");

const root = ReactDOM.createRoot(domNode);

root.render(
  <StrictMode>
    <DataContext>
      <App />
    </DataContext>
  </StrictMode>
);
