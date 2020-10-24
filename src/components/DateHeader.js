import React, { useState, useEffect } from 'react';

// @material-ui core
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// utils
import { dateFormat } from '../utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default () => {
  const classes = useStyles();
  const [date, setDate] = useState(dateFormat());

  useEffect(() => {
    const realtimeDate = setInterval(() => {
      setDate(dateFormat());
    }, 1000);

    return () => {
      clearInterval(realtimeDate);
    };
  });

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="body1" color="inherit" noWrap>
        {date}
      </Typography>
    </Paper>
  );
};
