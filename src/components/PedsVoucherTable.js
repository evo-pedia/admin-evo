import React, { useState, useEffect } from 'react';

// @material-ui
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// dt
import DataTable from 'mui-datatables';
import { fetchWithToken, dateNaboyAnying } from '../utils';
import { HISTORY_PEDS, HISTORY_VOUCHER } from '../utils/links';

// data table setup
const pedsColumn = [
  {
    name: 'ID',
    options: {
      filter: true,
      display: 'false',
    },
  },
  'Receiver',
  'Peds',
  'Tanggal',
];

const evColumn = [
  {
    name: 'ID',
    options: {
      filter: true,
      display: 'false',
    },
  },
  'Receiver',
  'Voucher',
  'Tanggal',
];

const options = {
  elevation: 3,
  selectableRows: 'none',
  download: false,
  print: false,
};

export default ({ isGenerated }) => {
  // state history
  const [historyPeds, setHistoryPeds] = useState([]);
  const [historyVoucher, setHistoryVoucher] = useState([]);

  useEffect(() => {
    const getPedsAndVoucher = async () => {
      const pedsData = await fetchWithToken(HISTORY_PEDS, 'GET');
      const voucherData = await fetchWithToken(HISTORY_VOUCHER, 'GET');

      // reverse kata naba
      const peds = pedsData.reverse();
      const voucher = voucherData.reverse();

      // map new peds arr
      const convertedPeds = peds.map((el) => {
        const newDate = dateNaboyAnying(el.created);
        const newData = [el.id, el.receiver, el.nominal, newDate];

        return newData;
      });

      const convertedVoucher = voucher.map((el) => {
        const newDate = dateNaboyAnying(el.created);
        const newData = [el.id, el.receiver, el.nominal, newDate];

        return newData;
      });

      setHistoryPeds(convertedPeds);
      setHistoryVoucher(convertedVoucher);
    };

    getPedsAndVoucher();
  }, [isGenerated]);

  return (
    <Box mt={5} mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DataTable
            title="Peds"
            data={historyPeds}
            columns={pedsColumn}
            options={options}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataTable
            title="Voucher"
            data={historyVoucher}
            columns={evColumn}
            options={options}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
