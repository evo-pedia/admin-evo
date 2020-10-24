import React, { useState, useEffect } from 'react';

// @material-ui core
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// local
import AppBar from './AppBar';
import DateHeader from './DateHeader';
import Uang from './Uang';
import Footer from './Footer';
import TabelTransaksi from './TabelTransaksi';

// utils
import { lastUpdated, fetchWithToken } from '../utils';
import { ACTIVATION_TYPE, ALL_MEMBERS } from '../utils/links';

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
}));

export default () => {
  const classes = useStyles();
  const [members, setMembers] = useState(0);
  const [oneToNineNine, set99] = useState(0);
  const [hundred, setHundred] = useState(0);
  const [acanAktivasiAiManeh, setAcanAktivasi] = useState(0);

  // get user activation type
  useEffect(() => {
    const getTotalActivationType = async () => {
      const data = await fetchWithToken(ACTIVATION_TYPE, 'GET');
      const { aktivasi_1_to_99, aktivasi_gte_100, belum_aktivasi } = data;
      set99(aktivasi_1_to_99);
      setHundred(aktivasi_gte_100);
      setAcanAktivasi(belum_aktivasi);
    };

    getTotalActivationType();
  }, []);

  // get all members
  useEffect(() => {
    const getTotalMembers = async () => {
      const data = await fetchWithToken(ALL_MEMBERS, 'GET');
      setMembers(data);
    };

    getTotalMembers();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <DateHeader />
          <Grid container spacing={2}>
            {/* Jumlah Peds dan Jumlah Member */}
            <Grid item xs={12} md={6}>
              <Uang
                title="Jumlah Member"
                amount={members}
                lastUpdated={lastUpdated()}
                formatMoney={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Uang
                title="Jumlah Member Belum Aktivasi"
                amount={acanAktivasiAiManeh}
                lastUpdated={lastUpdated()}
                formatMoney={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Uang
                title="Jumlah Member Aktivasi 10 ~ 99"
                amount={oneToNineNine}
                lastUpdated={lastUpdated()}
                formatMoney={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Uang
                title="Jumlah Member Aktivasi 100+"
                amount={hundred}
                lastUpdated={lastUpdated()}
                formatMoney={false}
              />
            </Grid>
            {/* Grid Item End */}
          </Grid>
          <TabelTransaksi />
          <Footer />
        </Container>
      </main>
    </div>
  );
};
