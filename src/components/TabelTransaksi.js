import React, { useState, useEffect } from 'react';

// @material-ui core
import Box from '@material-ui/core/Box';

// mui-datatables
import DataTable from 'mui-datatables';

// utils
import {
  fetchWithToken,
  dateNaboyAnying,
  thousandFormat,
  dateFormat,
} from '../utils';
import { ALL_TRANSAKSI } from '../utils/links';

const columns = [
  {
    name: 'ID',
    options: {
      filter: true,
      display: 'false',
    },
  },
  'Receiver',
  'Nominal',
  'Tipe',
  'Tanggal',
];

const options = {
  elevation: 3,
  selectableRows: 'none',
  print: false,
  downloadOptions: {
    filename: `List Transaksi per Tanggal ${dateFormat()}.csv`,
  },
};

export default () => {
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    const getAllTransactions = async () => {
      const allTransactions = await fetchWithToken(ALL_TRANSAKSI, 'GET');
      const data = allTransactions.reverse();
      const convert = data.map((el) => {
        const formatTanggal = dateNaboyAnying(el.created);
        const newData = [
          el.id,
          el.receiver.toUpperCase(),
          thousandFormat(el.nominal),
          el.tipe.toUpperCase(),
          formatTanggal,
        ];

        return newData;
      });

      setAllTransactions(convert);
    };

    getAllTransactions();
  }, []);

  return (
    <Box mb={8}>
      <DataTable
        title={'Semua Transaksi'}
        data={allTransactions}
        columns={columns}
        options={options}
      />
    </Box>
  );
};
