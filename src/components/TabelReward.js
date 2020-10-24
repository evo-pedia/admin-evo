import React, { useState, useEffect } from 'react';

// @material-ui core
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// mui-datatables
import DataTable from 'mui-datatables';

// local
import RewardForm from './RewardForm';
import {
  dateFormat,
  fetchWithToken,
  dateNaboyAnying,
  ubahReward,
} from '../utils';
import { GET_REWARD_LIST } from '../utils/links';

export default ({ isUpdated, updated }) => {
  // form states
  const [formDialog, setFormDialog] = useState(false);
  const [formData, setFormData] = useState(['', '', '']);

  // data state
  const [reward, setReward] = useState([]);

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
    'Tanggal Claim',
    {
      name: 'Menu',
      options: {
        filter: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleFormOpen(tableMeta)}>
            Konfirmasi
          </Button>
        ),
      },
    },
  ];

  const options = {
    elevation: 2,
    responsive: 'standard',
    selectableRows: 'none',
    print: false,
    downloadOptions: {
      filename: `List Reward Belum Acc per ${dateFormat()}.csv`,
    },
  };

  const handleFormOpen = ({ rowData }) => {
    setFormData(rowData);
    setFormDialog(true);
  };

  const handleStatus = (el) => {
    if (!el.status_claimed) {
      return 'Belum di-claim';
    }

    return 'Sudah di-claim';
  };

  useEffect(() => {
    const getRewardList = async () => {
      const data = await fetchWithToken(GET_REWARD_LIST, 'GET');
      const rewardData = data.reverse();
      const converted = rewardData.map((el) => {
        const newDate = dateNaboyAnying(el.claimed_at);
        const newStatus = handleStatus(el);
        const newReward = ubahReward(el.jenis_reward);
        const newData = [
          el.id,
          el.username,
          newReward,
          newStatus,
          newDate,
          // for data post
          el.user,
        ];

        return newData;
      });

      setReward(converted);
    };

    getRewardList();
  }, [updated]);

  return (
    <>
      <Box mb={6}>
        <DataTable
          title={'Pending Rewards'}
          data={reward}
          columns={columns}
          options={options}
        />
      </Box>
      <RewardForm
        formOpen={formDialog}
        formData={formData}
        formClose={(bool) => setFormDialog(bool)}
        isApproved={(bool) => isUpdated(bool)}
        approvalState={updated}
      />
    </>
  );
};
