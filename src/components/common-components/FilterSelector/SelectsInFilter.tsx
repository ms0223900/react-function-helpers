import React, { memo, useCallback, useRef, createRef, useEffect, forwardRef, Ref, MutableRefObject } from 'react';
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
import useScrollToSingleSelect from './useScrollToSingleSelect';

export const NoOptionsInfo = ({ input }: {
  input: string
}) => {
  return (
    <ListItem>
      <ListItemText primary={ `no result matched ${ input }` } />
    </ListItem>);
};

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
  const listRefs = React.useRef(filteredOptions.map((op) => (
    React.createRef<HTMLDivElement>()
  )));
  const classes = useStylesSelectsInFilter();

  const handleSelectRoute = useCallback((index: number) => {
    return () => {
      selectFn && selectFn(index);
    };
  }, [selectFn]);

  const handleClose = useCallback(() => {
    closeSelectsFn && closeSelectsFn();
  }, [closeSelectsFn]);

  useScrollToSingleSelect(listRefs, selectedIndex);

  return (
    <Box className={ classes && classes.root }>
      <Paper>
        <Box padding={1}>
          <TextField 
            fullWidth 
            autoFocus={ true }
            variant={'outlined'}
            onChange={ filterFn }
            value={ filterInput } />
        </Box>
        <List className={classes.selects}>
          { filteredOptions.length > 0 ? (
            filteredOptions.map((option, i) => (
              <SingleSelect 
                key={i}
                ref={listRefs.current[i]}
                option={option}
                isSelected={selectedIndex === i}
                clickFn={handleSelectRoute(i)}  />
            ))
          ) : (
            <NoOptionsInfo input={filterInput} />
          ) }
        </List>
      </Paper>
      <Box 
        id={'selectsInFilterBG'}
        className={classes.clickBG} 
        onClick={handleClose}
      />
    </Box>
  );
};

export default memo(Selects);