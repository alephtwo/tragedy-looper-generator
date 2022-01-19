import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Application } from './Application';
import { colors as Colors, createTheme, CssBaseline, ThemeProvider } from '@mui/material';

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
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
  },
});

const app = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Application />
  </ThemeProvider>
);

const mount = document.getElementById('app');
ReactDOM.render(app, mount);
