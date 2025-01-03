import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/styles.css";
import RoutesIndex from "./routes/RoutesIndex";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <RoutesIndex />
    </StrictMode>
  </BrowserRouter>
);
