import React, { useEffect, useState } from 'react';

// @material-ui core
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

// local
import AppBar from './AppBar';
import DateHeader from './DateHeader';
import Footer from './Footer';
import Uang from './Uang';
import GenerateCurrency from './GenerateCurrency';
import PedsVoucherTable from './PedsVoucherTable';

// utils
import { fetchWithToken, lastUpdated } from '../utils';
import { BANK } from '../utils/links';

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

  // state voucher
  const [peds, setPeds] = useState(0);
  const [voucher, setVoucher] = useState(0);

  // state when generate voucher
  const [isGenerated, setGenerated] = useState(false);

  useEffect(() => {
    setGenerated(false);
    const getPoint = async () => {
      const { peds, evoucher } = await fetchWithToken(BANK, 'GET');
      setPeds(peds);
      setVoucher(evoucher);
    };
    getPoint();
  }, [isGenerated]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <DateHeader />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Uang
                title="Total Peds"
                amount={peds}
                lastUpdated={lastUpdated()}
                formatMoney={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Uang
                title="Total E-Voucher"
                amount={voucher}
                lastUpdated={lastUpdated()}
                formatMoney={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <GenerateCurrency
                title="Peds"
                type="peds"
                isGenerated={(value) => setGenerated(value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <GenerateCurrency
                title="E-Voucher"
                type="ev"
                isGenerated={(value) => setGenerated(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <PedsVoucherTable isGenerated={isGenerated} />
            </Grid>
          </Grid>
          <Footer />
        </Container>
      </main>
    </div>
  );
};
