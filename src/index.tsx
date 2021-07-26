import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Application } from './Application';
import { createTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import * as Colors from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: Colors.red,
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
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Application />
  </MuiThemeProvider>
);

const mount = document.getElementById('app');
ReactDOM.render(app, mount);
