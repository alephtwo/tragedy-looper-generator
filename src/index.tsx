import * as React from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./Application";
import "./i18n";
import { colors as Colors, createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: Colors.red,
    secondary: Colors.amber,
    background: {
      default: Colors.grey[900],
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
  },
});

const app = (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Application />
    </ThemeProvider>
  </React.Suspense>
);

const root = createRoot(document.getElementById("app") as HTMLDivElement);
root.render(app);
