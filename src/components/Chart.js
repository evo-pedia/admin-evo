import React from 'react';

// @material-ui core
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// recharts
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Label,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 334,
  },
}));

// chart data
const createData = (day, month, ped, evoucher) => {
  return { day, month, ped, evoucher };
};

const data = [
  createData(1, 1, 4, 5),
  createData(2, 1, 8, 10),
  createData(3, 1, 12, 42),
  createData(4, 2, 18, 92),
  createData(5, 2, 69, 610),
  createData(6, 2, 84, 732),
  createData(7, 2, 91, 7),
  createData(8, 2, 104, 13),
  createData(9, 2, 198, 19),
  createData(10, 3, 10, 25),
  createData(11, 3, 14, 31),
  createData(12, 3, 18, 37),
  createData(13, 3, 22, 43),
  createData(14, 3, 26, 49),
  createData(15, 4, 30, 55),
  createData(16, 4, 16, 22),
  createData(17, 4, 17, 29),
  createData(18, 4, 23, 36),
  createData(19, 4, 29, 43),
  createData(20, 5, 35, 70),
  createData(21, 5, 41, 97),
  createData(22, 5, 47, 124),
  createData(23, 5, 53, 511),
  createData(24, 5, 59, 124),
  createData(25, 6, 25, 145),
  createData(26, 6, 27, 166),
  createData(27, 6, 29, 30),
  createData(28, 6, 31, 34),
  createData(29, 6, 33, 38),
  createData(30, 7, 35, 200),
];

export default ({ type }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5" color="inherit" gutterBottom>
        Perkembangan {type === 'month' ? ' Bulanan ' : ' Harian '} Ped Wallet
        dan E-Voucher
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 24,
            left: 24,
          }}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey={type === 'month' ? 'month' : 'day'}
            type="number"
            stroke={theme.palette.text.secondary}>
            <Label
              position="bottom"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
              }}>
              {type === 'month' ? 'Bulan' : 'Hari'}
            </Label>
          </XAxis>
          <Tooltip />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
              }}>
              Jumlah
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="ped"
            stroke={theme.palette.primary.main}
            dot={true}
          />
          <Line
            type="monotone"
            dataKey="evoucher"
            stroke={theme.palette.secondary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};
