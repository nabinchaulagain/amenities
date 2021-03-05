import React from 'react';

import { TextField, Grid, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const CommentForm = ({ placeholder, margin, onSubmit }) => {
  const [input, setInput] = React.useState('');
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit(input);
      }}
    >
      <Grid container direction="row">
        <Grid xs={10} md={8} item>
          <TextField
            value={input}
            onChange={(ev) => setInput(ev.target.value)}
            fullWidth={true}
            placeholder={placeholder}
            margin={margin}
          />
        </Grid>
        <Grid item>
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CommentForm;
