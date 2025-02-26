import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App.tsx";
import "./index.scss";
import { SeminarContextProvider } from "./shared/seminars-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SeminarContextProvider>
      <App />
    </SeminarContextProvider>
  </StrictMode>
);
