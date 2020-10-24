import React from 'react';

// @material-ui core
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// clsx
import clsx from 'clsx';

// utils
import { moneyFormat, thousandFormat } from '../utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  dateContext: {
    flex: 1,
  },
  ev: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default ({ title, amount, lastUpdated, formatMoney }) => {
  const classes = useStyles();

  return (
    <Paper
      className={
        title.includes('E-Voucher')
          ? clsx(classes.paper, classes.ev)
          : classes.paper
      }>
      <Typography component="h2" variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography
        component="h1"
        variant="h4"
        color="inherit"
        gutterBottom
        noWrap>
        {formatMoney ? moneyFormat(amount) : thousandFormat(amount)}
        {title.includes('Member') ? ' orang' : ''}
      </Typography>
      <Typography variant="overline" className={classes.dateContext}>
        diubah pada {lastUpdated}
      </Typography>
    </Paper>
  );
};
