import React, { useState, useEffect } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// local
import { fetchWithToken } from '../utils';
import { WD_APPROVAL } from '../utils/links';

export default ({
  formOpen,
  formClose,
  formData,
  isApproved,
  approvalState,
}) => {
  // form states
  const [wdId, setWdId] = useState('');
  const [username, setUsername] = useState('');
  const [duit, setDuit] = useState('');
  const [evNom, setEvNom] = useState('');
  const [voucherCode, setVoucherCode] = useState('');

  // dialog states
  const [loading, setLoading] = useState(false);
  const [submitGuard, setSubmitGuard] = useState(false);

  const handleOpenGuard = () => {
    setSubmitGuard(true);
  };

  const handleCloseGuard = () => {
    setSubmitGuard(false);
  };

  const handleFormDialogClose = () => {
    formClose(false);
  };

  const handleFormSubmit = async () => {
    setLoading(true);

    if (!voucherCode.length) {
      setLoading(false);
      setSubmitGuard(false);
      return;
    }

    const struct = {
      wd_id: wdId,
      sender: username,
      evoucher: evNom,
      approval: true,
      kode_voucher: voucherCode,
    };

    const approval = await fetchWithToken(WD_APPROVAL, 'POST', struct);

    if (approval === 201) {
      // set refresh here
      isApproved(!approvalState);

      setLoading(false);
      setSubmitGuard(false);
      formClose(false);
    }
  };

  useEffect(() => {
    setWdId(formData[0]);
    setUsername(formData[1]);
    setEvNom(formData[2]);
    setDuit(formData[3]);
  }, [formData]);

  return (
    <>
      {/* confirmation form */}
      <Dialog
        open={formOpen}
        onClose={handleFormDialogClose}
        aria-labelledby="alert">
        <DialogTitle id="alert">Withdraw Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tolong isi data ini dengan lengkap!
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                disabled
                margin="dense"
                label="Username"
                type="text"
                variant="outlined"
                fullWidth
                value={username}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled
                margin="dense"
                label="Nominal E-Voucher"
                type="text"
                variant="outlined"
                fullWidth
                value={evNom}
              />
            </Grid>
          </Grid>
          <TextField
            disabled
            margin="dense"
            label="Nominal Rupiah"
            type="text"
            variant="outlined"
            fullWidth
            value={duit}
          />
          <TextField
            error={!voucherCode.length}
            margin="dense"
            label="Indodax Voucher"
            placeholder="Wajib diisi!"
            type="text"
            variant="outlined"
            fullWidth
            value={voucherCode}
            onChange={(e) => {
              setVoucherCode(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormDialogClose} color="secondary">
            Batalkan
          </Button>
          <Button onClick={handleOpenGuard} color="primary">
            Setuju
          </Button>
        </DialogActions>
      </Dialog>

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
            Setuju
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
