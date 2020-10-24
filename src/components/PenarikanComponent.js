import React, { useState } from 'react';

// @material-ui core
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

// local
import AppBar from './AppBar';
import DateHeader from './DateHeader';
import Footer from './Footer';
import TabelPenarikan from './TabelPenarikan';
import TabelHasilWithdraw from './TabelHasilWithdraw';

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
}));

export default () => {
  const classes = useStyles();

  const [updated, setUpdated] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <DateHeader />
          <TabelPenarikan
            isUpdated={(bool) => setUpdated(bool)}
            updated={updated}
          />
          <Divider />
          <TabelHasilWithdraw
            isUpdated={(bool) => setUpdated(bool)}
            updated={updated}
          />
          <Footer />
        </Container>
      </main>
    </div>
  );
};
