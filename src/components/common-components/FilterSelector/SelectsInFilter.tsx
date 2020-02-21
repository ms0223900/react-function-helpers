import React, { memo, useCallback, useRef, createRef, useEffect, forwardRef, Ref } from 'react';
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
import { SingleSelectProps, SelectsInFilterProps } from './types';
import { useStylesSelectsInFilter } from './styles';

export const SingleSelect = forwardRef(({
  option, isSelected, clickFn
}: SingleSelectProps, ref: Ref<HTMLDivElement>) => {
  return (
    <ListItem  
      ref={ref}
      selected={ isSelected }
      onClick={ clickFn } 
      button
    >
      <ListItemText primary={ option.text } />
    </ListItem>
  );
});

export const Selects = ({ 
  filterInput, 
  filteredOptions, 
  selectedIndex, 
  filterFn, 
  selectFn,
  closeSelectsFn 
}: SelectsInFilterProps) => {
  const listRefs = useRef(filteredOptions.map((op) => createRef<HTMLDivElement>()));
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

  useEffect(() => {
    if(typeof selectedIndex === 'number') {
      const itemRefNow = listRefs.current[selectedIndex].current;
      itemRefNow && itemRefNow.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [listRefs, selectedIndex]);

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
        <ul className={classes.selects}>
          { filteredOptions && filteredOptions.length > 0 ? (
            filteredOptions.map((option, i) => (
              <SingleSelect 
                key={i}
                ref={listRefs.current[i]}
                option={option}
                isSelected={selectedIndex === i}
                clickFn={handleSelectRoute(i)}  />
            ))
          ) : (
            <ListItem>
              <ListItemText primary={ `no result matched ${ filterInput }` } />
            </ListItem>
          ) }
        </ul>
      </Paper>
      <Box 
        className={classes.clickBG} 
        onClick={handleClose}
      />
    </Box>
  );
};

export default memo(Selects);