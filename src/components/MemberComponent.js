import React, { useState, useEffect } from 'react';

// @material-ui core
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

// mui-datatables
import DataTable from 'mui-datatables';

// local
import AppBar from './AppBar';
import DateHeader from './DateHeader';
import Footer from './Footer';
import MemberSearch from './MemberSearch';
import EditForm from './MemberEditForm';

// utils
import { dateFormat, fetchWithToken, thousandFormat } from '../utils';
import { LIST_MEMBERS, SEARCH_MEMBER } from '../utils/links';

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
  loading: {
    display: 'block',
    margin: '25% auto',
  },
}));

export default () => {
  const classes = useStyles();

  // system states
  const [loading, setLoading] = useState(false);

  // form states
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(0);
  const [changes, setChanges] = useState(false);

  // list members
  const [allMembers, setAllMembers] = useState([]);

  // search states
  const [searchUname, setSearchUname] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const columns = [
    {
      name: 'ID',
      options: {
        filter: true,
        display: 'none',
      },
    },
    'Username',
    'Nama',
    'Email',
    'Role',
    'Type',
    'NIK',
    'Referred By',
    'Status Activation',
    'Deposit Activation',
    'Peds',
    'Voucher',
    {
      name: 'Menu',
      options: {
        filter: false,
        download: false,
        print: false,
        customBodyRender: (val, meta, upd) => (
          <Box m={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleFormOpen(meta)}>
              Info
            </Button>
          </Box>
        ),
      },
    },
  ];

  const options = {
    elevation: 4,
    print: false,
    selectableRows: 'none',
    search: false,
    responsive: 'standard',
    downloadOptions: {
      filename: `List Member per ${dateFormat()}.csv`,
    },
  };

  const handleFormOpen = ({ rowData }) => {
    setEditId(rowData[0]);
    setFormOpen(true);
  };

  // recent 200 data
  useEffect(() => {
    setLoading(true);
    setChanges(false);
    const getListMembers = async () => {
      const data = await fetchWithToken(LIST_MEMBERS, 'GET');
      const convert = data.map((el) => {
        // change status activation
        const status = () => {
          if (!el.status_activation) {
            return 'Belum Aktif';
          }

          return 'Aktif';
        };

        const newData = [
          el.id,
          el.username,
          el.name.toUpperCase(),
          el.email,
          el.role,
          el.user_type,
          el.id_number,
          el.referral_by,
          status(),
          thousandFormat(el.deposit_activation),
          el.peds,
          el.evoucher
        ];

        return newData;
      });
      setAllMembers(convert);
      setLoading(false);
    };

    getListMembers();
  }, [changes]);

  // get searched member
  useEffect(() => {
    const searchSingleUser = async () => {
      setSearchLoading(true);
      const struct = {
        username: searchUname,
      };

      const data = await fetchWithToken(SEARCH_MEMBER, 'POST', struct);
      const convert = data.map((el) => {
        // change status activation
        const status = () => {
          if (!el.status_activation) {
            return 'Belum Aktif';
          }

          return 'Aktif';
        };

        const newData = [
          el.id,
          el.username,
          el.name.toUpperCase(),
          el.email,
          el.role,
          el.user_type,
          el.id_number,
          el.referral_by,
          status(),
          thousandFormat(el.deposit_activation),
          el.peds,
          el.evoucher
        ];

        return newData;
      });
      setAllMembers(convert);
      setSearchLoading(false);
    };

    if (searchUname.length) {
      searchSingleUser();
    }
  }, [searchUname]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <DateHeader />
          {loading ? (
            <CircularProgress size={100} className={classes.loading} />
          ) : (
            <>
              {searchLoading ? (
                <CircularProgress
                  size={25}
                  style={{ display: 'block', margin: '5.2vh 50vw' }}
                />
              ) : (
                <Box ml="45vw">
                  <MemberSearch
                    searchedUsername={(uname) => setSearchUname(uname)}
                  />
                </Box>
              )}
              <Box mt={3} mb={9}>
                <DataTable
                  title={'Member'}
                  data={allMembers}
                  columns={columns}
                  options={options}
                />
              </Box>
            </>
          )}
          <EditForm
            formOpen={formOpen}
            formClose={(val) => setFormOpen(val)}
            editId={editId}
            isSubmited={(val) => setChanges(val)}
          />
          <Footer />
        </Container>
      </main>
    </div>
  );
};
