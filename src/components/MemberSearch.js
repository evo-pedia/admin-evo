import React, { useState } from 'react';

// @material-ui core
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

// @material-ui icons
import SearchIcon from '@material-ui/icons/Search';

export default ({ searchedUsername }) => {
  const [username, setUsername] = useState('');

  const handleSearchUser = (e) => {
    e.preventDefault();

    searchedUsername(username);
  };

  return (
    <form onSubmit={handleSearchUser}>
      <TextField
        margin="dense"
        variant="outlined"
        label="Username"
        placeholder="Search by username..."
        type="text"
        value={username}
        onInput={(e) => setUsername(e.target.value.toUpperCase())}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};
