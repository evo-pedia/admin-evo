import React from 'react';

// @material-ui core
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// local
import AppBar from './AppBar';
import DateHeader from './DateHeader';
import Footer from './Footer';
import Uang from './Uang';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: {
    paddingRight: 24,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(3, 9),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <DateHeader />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Uang
                title="2.5% Share Profit"
                amount={2000}
                lastUpdated="27 Juli 2020"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Uang
                title="Total Omzet"
                amount={500000}
                lastUpdated="27 Juli 2020"
                formatMoney
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Uang
                title="Total Majesty Member"
                amount={2500}
                lastUpdated="27 Juli 2020"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Uang
                title="Total ECL Member"
                amount={1500}
                lastUpdated="27 Juli 2020"
              />
            </Grid>
          </Grid>
          <Footer />
        </Container>
      </main>
    </div>
  );
};
