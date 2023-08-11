import * as React from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./view/Application";
import "./i18n";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { reportAccessibility } from "./util/a11y";

const app = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <Application />
    </React.Suspense>
  </ThemeProvider>
);

const root = createRoot(document.getElementById("app") as HTMLDivElement);
root.render(app);

reportAccessibility(React).catch(console.error);
