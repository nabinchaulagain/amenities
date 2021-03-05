import React from 'react';

import { TextField, Grid, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const CommentForm = ({ placeholder, margin, onSubmit }) => {
  const [input, setInput] = React.useState('');
  const [error, setError] = React.useState('');
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        if (input.length < 3) {
          setError('text should be at least 3 characters');
        } else {
          onSubmit(input);
        }
        setInput('');
      }}
    >
      <Grid container direction="row">
        <Grid xs={10} md={8} item>
          <TextField
            value={input}
            onChange={(ev) => {
              setInput(ev.target.value);
              setError('');
            }}
            fullWidth={true}
            placeholder={placeholder}
            margin={margin}
            error={Boolean(error)}
            helperText={error}
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
