import React, { useState, useEffect } from 'react';

// @material-ui core
import Box from '@material-ui/core/Box';

// mui-datatables
import DataTable from 'mui-datatables';

// local
import {
  dateFormat,
  fetchWithToken,
  dateNaboyAnying,
  moneyFormat,
} from '../utils';
import { WD_HISTORY } from '../utils/links';

// data table
const columns = [
  {
    name: 'ID',
    options: {
      filter: true,
      display: 'none',
    },
  },
  'Sender',
  'E-Voucher',
  'Konversi Rupiah',
  'Kode Voucher',
  'Tanggal',
];

const options = {
  elevation: 2,
  responsive: 'standard',
  print: false,
  selectableRows: 'none',
  downloadOptions: {
    filename: `List Withdraw per ${dateFormat()}.csv`,
  },
};
export default ({ updated }) => {
  const [historyWd, setHistoryWd] = useState([]);

  useEffect(() => {
    const getWdHistory = async () => {
      const data = await fetchWithToken(WD_HISTORY, 'GET');
      const wdHist = data.reverse();
      const converted = wdHist.map((el) => {
        const newDate = dateNaboyAnying(el.created);
        const newMoney = moneyFormat(el.evoucher * 15000);
        const newData = [
          el.id,
          el.sender,
          el.evoucher,
          newMoney,
          el.kode_voucher,
          newDate,
        ];

        return newData;
      });

      setHistoryWd(converted);
    };

    getWdHistory();
  }, [updated]);

  return (
    <Box mt={5} mb={6}>
      <DataTable
        title={'Post-withdraw list'}
        data={historyWd}
        columns={columns}
        options={options}
      />
    </Box>
  );
};
