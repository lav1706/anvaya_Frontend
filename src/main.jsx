import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LeadProvider } from "./context/leadContext.jsx";
import { AgentProvider } from "./context/agentContext.jsx";
import CommentProvider from "./context/CommentContext.jsx";
import TagProvider from "./context/tagContext.jsx";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LeadProvider>
      <TagProvider>
        <CommentProvider>
          <AgentProvider>
            <App />
          </AgentProvider>
        </CommentProvider>
      </TagProvider>
    </LeadProvider>
  </StrictMode>
);
