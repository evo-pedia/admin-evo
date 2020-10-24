import React, { useState, useEffect } from 'react';

// @material-ui core
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// mui-datatables
import DataTable from 'mui-datatables';

// local
import WdForm from './WdForm';
import {
  dateFormat,
  fetchWithToken,
  dateNaboyAnying,
  moneyFormat,
} from '../utils';
import { GET_WD_LIST } from '../utils/links';

export default ({ isUpdated, updated }) => {
  // form states
  const [formDialog, setFormDialog] = useState(false);
  const [formData, setFormData] = useState(['', '', '']);

  // data state
  const [wdData, setWdData] = useState([]);

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
    'Tanggal',
    {
      name: 'Menu',
      options: {
        filter: false,
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
    // disable this to enable delete by ids
    selectableRows: 'none',
    onRowsDelete: ({ data }) => {
      handleDeleteWd(data);
    },
    downloadOptions: {
      filename: `List Member per ${dateFormat()}.csv`,
    },
  };

  const handleDeleteWd = (data) => {
    //console.log(data);
    return false;
  };

  const handleFormOpen = ({ rowData }) => {
    setFormData(rowData);
    setFormDialog(true);
  };

  useEffect(() => {
    const getWdList = async () => {
      const data = await fetchWithToken(GET_WD_LIST, 'GET');
      const wdList = data.reverse();
      const converted = wdList.map((el) => {
        const newDate = dateNaboyAnying(el.created);
        const newData = [
          el.id,
          el.sender,
          el.evoucher,
          moneyFormat(el.evoucher * 10000),
          newDate,
        ];

        return newData;
      });

      setWdData(converted);
    };

    getWdList();
  }, [updated]);

  return (
    <>
      <Box mb={6}>
        <DataTable
          title={'Withdraw List'}
          data={wdData}
          columns={columns}
          options={options}
        />
      </Box>
      <WdForm
        formOpen={formDialog}
        formData={formData}
        formClose={(bool) => setFormDialog(bool)}
        isApproved={(bool) => isUpdated(bool)}
        approvalState={updated}
      />
    </>
  );
};
