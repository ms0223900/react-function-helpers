import React, { memo, useCallback } from 'react';
import { 
  TextField, 
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  makeStyles,
  Box,
} from '@material-ui/core';
import { clickBG } from 'styles/styleObjs';
import { SingleSelectProps, SelectsInFilterProps } from './types';
import { useStylesSelectsInFilter } from './styles';

export const SingleSelect = ({
  option, isSelected, clickFn
}: SingleSelectProps) => {
  return (
    <ListItem  
      selected={ isSelected }
      onClick={ clickFn } 
      button
    >
      <ListItemText primary={ option.text } />
    </ListItem>
  );
};

export const Selects = ({ 
  filterInput, 
  filteredOptions, 
  selectedIndex, 
  filterFn, 
  selectFn,
  closeSelectsFn 
}: SelectsInFilterProps) => {
  const classes = useStylesSelectsInFilter();

  const handleSelectRoute = useCallback((index: number) => {
    return () => {
      selectFn && selectFn(index);
    };
  }, [selectFn]);

  const handleClose = useCallback(() => {
    closeSelectsFn && closeSelectsFn();
  }, [closeSelectsFn]);

  if(!filteredOptions) {
    return <CircularProgress />;
  };

  return (
    <Box className={ classes && classes.root }>
      <Paper>
        <Box padding={1}>
          <TextField 
            fullWidth
            label={'route number'} 
            autoFocus={ true }
            variant={'outlined'}
            onChange={ filterFn }
            value={ filterInput } />
        </Box>
        <List className={classes.selects}>
          { filteredOptions && filteredOptions.length > 0 ? (
            filteredOptions.map((option, i) => (
              <SingleSelect 
                key={i}
                option={option}
                isSelected={selectedIndex === i}
                clickFn={handleSelectRoute(i)}  />
            ))
          ) : (
            <ListItem>
              <ListItemText primary={ `no result matched ${ filterInput }` } />
            </ListItem>
          ) }
        </List>
      </Paper>
      <Box 
        className={classes.clickBG} 
        onClick={handleClose}
      />
    </Box>
  );
};

export default memo(Selects);