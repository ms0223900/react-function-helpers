import { 
  Box, 
  Button, 
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Selects from './SelectsInFilter';
import { FilterSelectorProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    position: 'relative',
  },
  selectButton: {
    width: '100%',
  },
}));

const FilterSelector = (props: FilterSelectorProps) => {
  const {
    selectedText, 
    isDisplaySelects,
    toggleDisplaySelectsFn,
  } = props;
  const classes = useStyles();

  return (
    <Box className={ classes.root } >
      <Button 
        className={ classes.selectButton }
        variant={ 'outlined' } 
        onClick={toggleDisplaySelectsFn}
      >
        { selectedText }
        <Typography variant={ 'body1' }>
          { ' ▾ ' }
        </Typography>
      </Button>
      {isDisplaySelects && (
        <Selects 
          {...props}
          closeSelectsFn={toggleDisplaySelectsFn}
        />
      )}
    </Box>
  );
};


export default FilterSelector;
