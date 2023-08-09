import "./index.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./view/Application";
import "./i18n";
import { CssBaseline, ThemeProvider, colors, createTheme } from "@mui/material";

const defaultTheme = createTheme();
const theme = createTheme({
  palette: {
    primary: colors.purple,
    background: {
      default: colors.deepPurple[500],
    },
  },
  typography: {
    fontFamily: `"Noto Sans", ${defaultTheme.typography.fontFamily}`,
    h2: {
      fontSize: "28px",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.grey[500],
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          // Need to make it a little bit bolder
          fontWeight: 700,
        },
        root: {
          // // Need to make the table lines show up
          borderBottomColor: colors.grey[500],
        },
      },
    },
    MuiSelect: {
      // Don't want the background color to show
      styleOverrides: {
        outlined: {
          backgroundColor: "white",
        },
      },
    },
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
