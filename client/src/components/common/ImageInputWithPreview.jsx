import React from 'react';
import { Box, Button, FormHelperText } from '@material-ui/core';

const ImageInputWithPreview = (props) => {
  return (
    <Box align="left" mt={2} mb={2}>
      <Button variant="contained" component="label">
        Upload image
        <input type="file" onChange={props.onChange} hidden />
      </Button>
      <Box mt={2}>
        <img
          src={
            // if image in props is not a link create
            typeof props.image === 'string'
              ? props.image
              : URL.createObjectURL(props.image)
          }
          alt="upload preview"
          className="image-preview"
        />
        {props.error && (
          <FormHelperText error={true}>{props.error}</FormHelperText>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(ImageInputWithPreview, (prevProps, nextProps) => {
  // prevent unecessary re renders by re rendering only when error or image prop changes
  if (
    prevProps.image !== nextProps.image ||
    prevProps.error !== nextProps.error
  ) {
    return false;
  }
  return true;
});
