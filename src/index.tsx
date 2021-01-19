import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './components/Application';
import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import * as Colors from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: Colors.deepOrange,
    background: {
      default: Colors.deepPurple[500],
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
