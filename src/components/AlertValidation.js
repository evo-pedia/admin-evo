import React, { useState } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default ({ isError, message, passData }) => {
  const [open, setOpen] = useState(isError);

  const handleClose = () => {
    setOpen(false);
    passData(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert">
      <DialogTitle id="alert">Terjadi Kesalahan!</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Tutup
        </Button>
      </DialogActions>
    </Dialog>
  );
};
