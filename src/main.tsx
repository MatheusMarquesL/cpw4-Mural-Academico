import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/index.css";

import { AvisoProvider } from "./context/AvisoContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <AvisoProvider>
    <App />
  </AvisoProvider>
);