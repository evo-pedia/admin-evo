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
  ubahReward,
} from '../utils';
import { REWARD_LIST } from '../utils/links';

// data table
const columns = [
  {
    name: 'ID',
    options: {
      filter: true,
      display: 'none',
    },
  },
  'Username',
  'Jenis Reward',
  'Status',
  'Tanggal',
];

const options = {
  elevation: 2,
  responsive: 'standard',
  print: false,
  selectableRows: 'none',
  downloadOptions: {
    filename: `List Reward Acc per ${dateFormat()}.csv`,
  },
};
export default ({ updated }) => {
  const [reward, setReward] = useState([]);

  const handleStatus = (el) => {
    if (!el.status_claimed) {
      return 'Belum di-claim';
    }

    return 'Sudah di-claim';
  };

  useEffect(() => {
    const getRewards = async () => {
      const data = await fetchWithToken(REWARD_LIST, 'GET');
      const rewardData = data.reverse();
      const converted = rewardData.map((el) => {
        const newDate = dateNaboyAnying(el.approved_at);
        const newReward = ubahReward(el.jenis_reward);
        const newStatus = handleStatus(el);
        const newData = [el.id, el.username, newReward, newStatus, newDate];

        return newData;
      });

      setReward(converted);
    };

    getRewards();
  }, [updated]);

  return (
    <Box mt={5} mb={6}>
      <DataTable
        title={'Reward Telah Disetujui'}
        data={reward}
        columns={columns}
        options={options}
      />
    </Box>
  );
};
