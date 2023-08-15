import { colors, createTheme } from "@mui/material";

const defaultTheme = createTheme();
export const theme = createTheme({
  palette: {
    primary: colors.blueGrey,
    background: {
      default: colors.blueGrey[700],
    },
  },
  typography: {
    fontFamily: `"Noto Sans", ${defaultTheme.typography.fontFamily}`,
    h1: {
      fontSize: "32px",
      fontWeight: "bold",
    },
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
    MuiPaper: {
      variants: [
        {
          props: { variant: "transparent" },
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          },
        },
      ],
    },
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

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    transparent: true;
  }
}
