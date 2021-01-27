import React from 'react';
import { Box, Fab, makeStyles, Typography } from '@material-ui/core';
import { ImagePreviewFile } from '../lib/types';
import { Callback } from 'all-common-types';
import { Delete } from '@material-ui/icons';
import { PreviewImageItemProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    '&:hover button': {
      display: 'block',
    }
  },
  closeBtn: {
    display: 'none',
    position: 'absolute',
  }
}));

const PreviewImageItem = ({
  index, file, previewImageProps, onRemoveImage,
}: PreviewImageItemProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} paddingBottom={1}>
      <Fab className={classes.closeBtn} onClick={onRemoveImage && onRemoveImage(index)}>
        <Delete />
      </Fab>
      <img width={200} height={"auto"} alt={file.name} src={file.src} {...previewImageProps} />
      <Typography>{file.name}</Typography>
    </Box>
  );
};

export default PreviewImageItem;