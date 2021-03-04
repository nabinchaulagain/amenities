import { TextField, InputAdornment, IconButton, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const AdSearch = ({ onChange }) => {
  return (
    <Box
      component="form"
      maxWidth={320}
      mb={2}
      onSubmit={(ev) => {
        ev.preventDefault();
      }}
    >
      <TextField
        onChange={onChange}
        label="Search"
        variant="outlined"
        margin="dense"
        fullWidth={true}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
};

export default AdSearch;
