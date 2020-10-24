import React, { useState } from 'react';

// @material-ui/core
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// @material-ui/lab
import MuiAlert from '@material-ui/lab/Alert';

// utils
import { LOGIN_ADMIN } from '../utils/links';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: '12vh auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default () => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // snackbar states
  const [open, setOpen] = useState(false);

  // loading states
  const [loading, setLoading] = useState(false);

  const handleSnackbarClose = (_, r) => {
    if (r === 'clickaway') return;
    setOpen(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const struct = {
      username,
      password,
    };

    const loginAdmin = await fetch(LOGIN_ADMIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(struct),
    });

    const data = await loginAdmin.json();
    const { token, role } = data;

    if (
      data === 403 ||
      data.non_field_errors !== undefined ||
      data === 400 ||
      data.password !== undefined
    ) {
      setLoading(false);
      setOpen(true);
    } else {
      setLoading(false);

      // Save
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // clean the form
      pristineForm();

      // Reload after save to be redirected into dashboard
      window.location.reload();
    }
  };

  const pristineForm = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Evopedia Admin Panel
          </Typography>
          <form
            onSubmit={handleLoginSubmit}
            className={classes.form}
            noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.toUpperCase());
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {loading ? (
              <CircularProgress
                size={35}
                style={{ display: 'block', margin: '2vh auto' }}
              />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Masuk
              </Button>
            )}
          </form>
        </div>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error">
          Username / Password salah!
        </Alert>
      </Snackbar>
    </>
  );
};
