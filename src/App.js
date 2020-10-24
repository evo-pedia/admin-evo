import React, { useEffect } from 'react';

// @material-ui styles
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// react-router-dom
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';

// pages
import {
  Login,
  Dashboard,
  Members,
  Transaksi,
  Penarikan,
  Reward, 
  Videos
} from './pages';

// utils
import { token } from './utils';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7c4dff',
      light: '#b47cff',
      dark: '#3f1dcb',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
      contrastText: '#000',
    },
  },
});

export default () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (token && location.pathname === '/') {
      history.push('/dashboard');
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/">
          <Login />
        </Route>
        {!token ? (
          <Redirect to="/" />
        ) : (
          <>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/members">
              <Members />
            </Route>
            <Route path="/transaksi">
              <Transaksi />
            </Route>
            <Route path="/penarikan">
              <Penarikan />
            </Route>
            <Route path="/reward">
              <Reward />
            </Route>
            <Route path="/videos">
              <Videos />
            </Route>
          </>
        )}
      </Switch>
    </MuiThemeProvider>
  );
};
