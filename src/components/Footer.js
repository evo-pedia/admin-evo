import React from 'react';

// @material-ui core
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

export default () => {
  return (
    <>
      <Divider />
      <Box mt={6} mb={6}>
        <Typography variant="body1" color="textSecondary" align="center">
          <a
            href="https://rubixovt.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}>
            {' '}
            <b style={{ color: '#FD6801' }}>[rubi</b>
            <b style={{ color: 'black' }}>xovt]</b>
          </a>{' '}
          &copy; {new Date().getFullYear()}
        </Typography>
      </Box>
    </>
  );
};
