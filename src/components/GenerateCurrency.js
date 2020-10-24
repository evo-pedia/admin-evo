import React, { useState } from 'react';

// @material-ui core
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui icons
import EuroIcon from '@material-ui/icons/Euro';
import PaymentIcon from '@material-ui/icons/Payment';

// clsx
import clsx from 'clsx';

// utils
import { thousandFormat, fetchWithToken } from '../utils';

// local
import AlertValidation from './AlertValidation';
import { GENERATE_PEDS, GENERATE_VOUCHER } from '../utils/links';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  dateContext: {
    flex: 1,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
  ev: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
}));

export default ({ title, type, isGenerated }) => {
  const classes = useStyles();

  // form states
  const [currency, setCurrency] = useState('');
  const [name, setName] = useState('');

  // alert states
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleGeneratePedSubmit = (e) => {
    e.preventDefault();

    // open alert if currency belows zero
    if (currency < 1) {
      errorAlert();
      setAlert(true);
    } else {
      setOpen(true);
    }
  };

  const handlePopUpSubmit = () => {
    if (!name.length) {
      errorAlert('Bagan tidak boleh ada yang kosong!');
      setAlert(true);
      return;
    }

    // TODO: move submit to async progress later
    setLoading(true);

    const struct = {
      tipe: type === 'peds' ? 'peds' : 'evoucher',
      nominal: currency,
      receiver: name.toUpperCase(),
      admin: '0',
    };

    postGeneratedData(struct, type);
  };

  const postGeneratedData = async (struct, type) => {
    let endPoint = type === 'peds' ? GENERATE_PEDS : GENERATE_VOUCHER;
    const result = await fetchWithToken(endPoint, 'POST', struct);

    if (result === 201) {
      setCurrency(0);
      isGenerated(true);
    } else if (result.status === 400) {
      errorAlert('Saldo bank tidak mencukupi!');
      setAlert(true);
    } else if (result.status === 404) {
      errorAlert('Username tidak ditemukan!');
      setAlert(true);
    }

    setLoading(false);
    setOpen(false);
    pristineForm();
  };

  // old validation, DO NOT USE THIS AGAIN BITCH!
  const errorAlert = (msg) => {
    let text = 'Jumlah Peds harus lebih dari 0!';
    if (type === 'ev') {
      text = 'Jumlah E-Voucher harus lebih dari 0!';
    }

    if (msg !== undefined) {
      text = msg;
    }

    setErrMsg(text);
  };

  // put here if you want to clean stuffs
  const pristineForm = () => {
    setName('');
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h6" gutterBottom>
          Generate {title}
        </Typography>
        <Typography component="h2" variant="h2" gutterBottom>
          {thousandFormat(currency)}
        </Typography>
        <form
          onSubmit={handleGeneratePedSubmit}
          className={classes.form}
          noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            label="Berapa banyak ?"
            value={currency}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {type === 'ev' ? <PaymentIcon /> : <EuroIcon />}
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setCurrency(Number(e.target.value));
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={type === 'ev' ? 'secondary' : 'primary'}
            className={
              type === 'ev' ? clsx(classes.ev, classes.submit) : classes.submit
            }>
            Kirim
            {type === 'ev' ? ' E-Voucher' : ' Peds'}
          </Button>
        </form>
      </Paper>
      {/* Dialog opened if the input passed all validations */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Isi Data Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lengkapi bagan di bawah ini untuk mengirim{' '}
            {thousandFormat(currency)}
            {type === 'ev' ? ' E-Voucher.' : ' Peds.'}
            <br />
            Pastikan data diisi dengan benar!
          </DialogContentText>
          <TextField
            required
            margin="dense"
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            value={name.toUpperCase()}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={loading}>
            Batalkan
          </Button>
          <Button
            onClick={handlePopUpSubmit}
            color="primary"
            disabled={loading}>
            Kirim
          </Button>
          {loading ? <CircularProgress /> : ''}
        </DialogActions>
      </Dialog>
      {alert ? (
        <AlertValidation
          isError
          message={errMsg}
          passData={(val) => setAlert(val)}
        />
      ) : (
        ''
      )}
    </>
  );
};
