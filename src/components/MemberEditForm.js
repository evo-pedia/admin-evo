import React, { useState, useEffect } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';

// @material-ui icons
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CreateIcon from '@material-ui/icons/Create';

// react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

// local
import MemberActivationHistory from './MemberActivationHistory';

// utils
import {
  fetchWithToken,
  getEmailUser,
  setEmailUser,
  numberOnly,
} from '../utils';
import { GET_MEMBER, EDIT_MEMBER, RESETPASSWORD } from '../utils/links';

// tab panels yang gitu gitu aja anjing

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box m={3}>{children}</Box>}
    </div>
  );
};

export default ({ formOpen, formClose, editId, isSubmited }) => {
  // theme
  const theme = useTheme();

  // form states
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNik] = useState('');
  const [activeDepo, setActiveDepo] = useState(0);
  const [limitPass, setLimitPass] = useState(0);
  const [role, setRole] = useState('USER');
  const [userType, setUserType] = useState('FREE USER');
  const [parentId, setParentId] = useState(0);
  const [activeStatus, setActiveStatus] = useState(false);

  // panel states
  const [panel, setPanel] = useState(0);

  // dialog states
  const [loading, setLoading] = useState(false);
  const [submitGuard, setSubmitGuard] = useState(false);

  // fetch state
  const [fetchLoading, setFetchLoading] = useState(false);

  // wrong states
  const [falseData, setFalseData] = useState(false);
  const [falseContent, setFalseContent] = useState('');
  const [titleDialog, setTitleDialog] = useState('');

  const handleOpenGuard = () => {
    setSubmitGuard(true);
  };

  const handleCloseGuard = () => {
    setSubmitGuard(false);
  };

  const handleCloseFalseData = () => {
    setFalseData(false);
  };

  const handleFormDialogClose = () => {
    formClose(false);
  };

  const handlePanelChange = (e, val) => {
    setPanel(val);
  };

  const handlePanelChangeIndex = (i) => {
    setPanel(i);
  };

  const handleResetPassword = async () => {
    setLoading(true);

    const response = await fetchWithToken(
      `${RESETPASSWORD}${editId}`,
      'POST',
      {}
    );

    if (response.message === 'ok') {
      setTitleDialog('Reset password berhasil');
      setFalseContent('Reset password berhasil');
    } else {
      setTitleDialog('Reset password gagal');
      setFalseContent('Reset password gagal');
    }

    setLoading(false);
    setFalseData(true);
    window.location.reload();
  };

  const handleFormSubmit = async () => {
    // spin shittt
    setLoading(true);

    // validation begins
    if (
      !username.length ||
      !name.length ||
      !email.length ||
      !phone.length ||
      !nik.length ||
      !role.length ||
      !userType.length
    ) {
      setLoading(false);
      setTitleDialog('Terjadi kesalahan!');
      setFalseContent('Terdapat bagan yang kosong!');
      setFalseData(true);
      return;
    } else if (email.includes('@')) {
      setLoading(false);
      setTitleDialog('Terjadi kesalahan!')
      setFalseContent('Bagan email hanya input bagian depan saja!');
      setFalseData(true);
      return;
    }

    const newEmail = setEmailUser(email);

    const struct = {
      name,
      email: newEmail,
      id_number: nik,
      phone,
      parent: Number(parentId),
      role,
      deposit_activation: Number(activeDepo),
      user_type: userType,
      limit_change_password: Number(limitPass),
      status_activation: activeStatus,
    };

    const submitUser = await fetchWithToken(
      `${EDIT_MEMBER}${editId}/`,
      'POST',
      struct
    );

    // success
    if (submitUser === 201) {
      setLoading(false);
      setSubmitGuard(false);
      formClose(false);
      isSubmited(true);

      //shit
      window.location.reload();
    } else {
      setLoading(false);
      setSubmitGuard(false);
      setFalseData(true);
    }
  };

  useEffect(() => {
    setFetchLoading(true);
    const getMemberId = async () => {
      const { data } = await fetchWithToken(`${GET_MEMBER}${editId}/`, 'GET');
      const {
        username: uname,
        name,
        email,
        phone,
        id_number,
        deposit_activation,
        role,
        parent,
        limit_change_password,
        status_activation,
        user_type,
      } = data;

      // divide begins
      const newEmail = getEmailUser(email);

      setUsername(uname);
      setName(name);
      setEmail(newEmail);
      setPhone(phone);
      setNik(id_number);
      setActiveDepo(deposit_activation);
      setUserType(user_type);
      setLimitPass(limit_change_password);
      setActiveStatus(status_activation);
      setParentId(parent);

      if (role === 'MANAJEMEN') {
        setRole('');
      } else {
        setRole(role);
      }

      setFetchLoading(false);
    };

    if (editId !== 0) {
      getMemberId();
    }
  }, [editId]);

  return (
    <>
      <Dialog
        open={formOpen}
        onClose={handleFormDialogClose}
        aria-labelledby="alert">
        <DialogTitle id="alert">Info User</DialogTitle>
        {fetchLoading ? (
          <CircularProgress
            size={50}
            style={{ display: 'block', margin: '2% auto' }}
          />
        ) : (
          <DialogContent>
            <Tabs
              value={panel}
              onChange={handlePanelChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary">
              <Tab icon={<CreateIcon />} label="EDIT DATA" />
              <Tab
                icon={<AccountBalanceWalletIcon />}
                label="ACTIVATION HISTORY"
              />
            </Tabs>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={panel}
              onChangeIndex={handlePanelChangeIndex}>
              <TabPanel value={panel} index={0} dir={theme.direction}>
                <TextField
                  required
                  margin="dense"
                  label="Username"
                  type="text"
                  variant="outlined"
                  value={username}
                  fullWidth
                />
                <TextField
                  required
                  margin="dense"
                  label="Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <TextField
                  margin="dense"
                  label="Email"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">@gmail.com</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="dense"
                  label="Phone"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (phone.length === 1) {
                      setPhone(value);
                    }

                    if (numberOnly(value)) {
                      setPhone(value);
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+62</InputAdornment>
                    ),
                  }}
                  inputProps={{
                    maxLength: 13,
                  }}
                />
                <TextField
                  required
                  margin="dense"
                  label="NIK"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={nik}
                  onChange={(e) => {
                    const { value } = e.target;

                    if (phone.length === 1) {
                      setNik(value);
                    }

                    if (numberOnly(value)) {
                      setNik(value);
                    }
                  }}
                  inputProps={{
                    maxLength: 16,
                  }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      required
                      margin="dense"
                      label="Deposit Aktifasi"
                      type="text"
                      variant="outlined"
                      fullWidth
                      value={activeDepo}
                      onChange={(e) => {
                        setActiveDepo(e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      required
                      margin="dense"
                      label="Limit Password"
                      type="text"
                      variant="outlined"
                      fullWidth
                      value={limitPass}
                      onChange={(e) => {
                        setLimitPass(e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={activeStatus}
                          onChange={(e) => setActiveStatus(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Status Aktifasi"
                      labelPlacement="top"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      select
                      required
                      fullWidth
                      margin="dense"
                      variant="outlined"
                      label="Role"
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}>
                      <MenuItem value="EXECUTIVE CORE LEADER">
                        EXECUTIVE CORE LEADER
                      </MenuItem>
                      <MenuItem value="USER">USER</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button color="secondary" onClick={handleResetPassword}>Reset Password</Button>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Button color="secondary">Suspend Account</Button>
                  </Grid> */}
                </Grid>
              </TabPanel>
              <TabPanel value={panel} index={1} dir={theme.direction}>
                <MemberActivationHistory editId={editId} username={username} />
              </TabPanel>
            </SwipeableViews>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleFormDialogClose} color="secondary">
            Batalkan
          </Button>
          <Button onClick={handleOpenGuard} color="primary">
            Ubah
          </Button>
        </DialogActions>
      </Dialog>
      {/* submit guard */}
      <Dialog
        open={submitGuard}
        onClose={handleCloseGuard}
        aria-labelledby="alert">
        <DialogTitle id="alert">Apakah anda yakin ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aksi ini tidak dapat dikembalikan!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress size={19} />
          ) : (
            <Button onClick={handleCloseGuard} color="secondary">
              Kembali
            </Button>
          )}
          <Button disabled={loading} onClick={handleFormSubmit} color="primary">
            Ubah
          </Button>
        </DialogActions>
      </Dialog>
      {/* wrong form guard */}
      <Dialog
        open={falseData}
        onClose={handleCloseFalseData}
        aria-labelledby="alert">
        <DialogTitle id="alert">{titleDialog}</DialogTitle>
        <DialogContent>
          <DialogContentText>{falseContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFalseData} color="secondary">
            Kembali
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
