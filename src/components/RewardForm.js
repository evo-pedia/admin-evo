import React, { useState, useEffect } from 'react';

// @material-ui core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// local
import { fetchWithToken } from '../utils';
import { REWARD_APPROVAL } from '../utils/links';

export default ({
  formOpen,
  formClose,
  formData,
  isApproved,
  approvalState,
}) => {
  // form states
  const [rewardId, setRewardId] = useState('');
  const [jenisReward, setJenisReward] = useState('');
  const [userId, setUserId] = useState('');

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

    const struct = {
      jenis_reward: jenisReward,
      status_claimed: true,
      user: Number(userId),
    };

    const approval = await fetchWithToken(
      `${REWARD_APPROVAL}${Number(rewardId)}/`,
      'POST',
      struct
    );

    if (approval === 201) {
      setLoading(false);
      setSubmitGuard(false);
      formClose(false);
      isApproved(!approvalState);
    }
  };

  useEffect(() => {
    setRewardId(formData[0]);
    setJenisReward(formData[2]);
    setUserId(formData[5]);
  }, [formData]);

  return (
    <>
      {/* confirmation form */}
      <Dialog
        open={formOpen}
        onClose={handleFormDialogClose}
        aria-labelledby="alert">
        <DialogTitle id="alert">Reward Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hasil Reward yang akan diberikan :
            <Typography
              variant="h4"
              style={{ margin: '2vh auto', marginRight: '8vw' }}
              color="textPrimary">
              {jenisReward}
            </Typography>
          </DialogContentText>
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
