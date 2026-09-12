import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@fontsource-variable/inter";
import "@fontsource-variable/source-serif-4";
import "./index.css";

import App from "./App";
import { applyTheme, loadSettings } from "@/lib/settings";
import { dedupeAnswers, recomputeCompletedScores } from "@/lib/repair";
import { startSyncEngine } from "@/lib/sync";

// Apply the stored theme before first paint to avoid a light-mode flash.
applyTheme(loadSettings().theme);

// Heal any duplicate answer rows left by the pre-transaction race before the
// sync engine tries to upload them, otherwise the backlog 409s forever.
void dedupeAnswers()
  .then(() => recomputeCompletedScores())
  .catch((err) => console.warn("[repair] failed", err))
  .finally(() => startSyncEngine());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
