import "./index.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./view/Application";
import "./i18n";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const defaultTheme = createTheme();
const theme = createTheme({
  typography: {
    fontFamily: `"Noto Sans", ${defaultTheme.typography.fontFamily}`,
  },
});
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
