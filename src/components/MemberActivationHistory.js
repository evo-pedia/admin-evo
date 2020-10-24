import React, { useState, useEffect } from 'react';

// data tables
import DataTable from 'mui-datatables';

// utils
import {
  fetchWithToken,
  dateNaboyAnying,
  dateFormat,
  thousandFormat,
} from '../utils';
import { HISTORY_ACTIVATION } from '../utils/links';

export default ({ editId, username }) => {
  // activation state
  const [activation, setActivation] = useState([]);

  // table columns
  const columns = [
    {
      name: 'ID',
      options: {
        filter: false,
        display: 'none',
      },
    },
    'Tanggal',
    'Jumlah',
  ];

  // table options
  const options = {
    elevation: 2,
    responsive: 'standard',
    selectableRows: 'none',
    print: false,
    downloadOptions: {
      filename: `List History Aktivasi ${username} per ${dateFormat()}.csv`,
    },
  };

  // get activation
  useEffect(() => {
    const getActivationHistory = async () => {
      const data = await fetchWithToken(
        `${HISTORY_ACTIVATION}${editId}/`,
        'GET'
      );
      const converted = data.map((el) => {
        const newDate = dateNaboyAnying(el.created_at);
        const newValue = thousandFormat(el.value);
        const newData = [el.id, newDate, newValue];

        return newData;
      });

      setActivation(converted);
    };

    getActivationHistory();
  }, [editId]);

  return <DataTable options={options} columns={columns} data={activation} />;
};
