import * as React from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./view/Application";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { reportAccessibility } from "./util/a11y";
import { Loading } from "./view/Loading";

const app = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.Suspense fallback={<Loading />}>
      <Application />
    </React.Suspense>
  </ThemeProvider>
);

const root = createRoot(document.getElementById("app") as HTMLDivElement);
root.render(app);

reportAccessibility(React).catch(console.error);
