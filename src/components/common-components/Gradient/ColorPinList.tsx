import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, makeStyles, RootRef } from '@material-ui/core';
import ColorPinItem from './ColorPinItem';
import { ColorPinListProps } from './types';
import { ID } from 'all-common-types';
import { getClientPercent } from './fn';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    // width: 300,
    height: 200,
    backgroundColor: '#ddd',
  }
}));

type PercentXY = {
  percentX: number,
  percentY: number,
}

const ColorPinList = (props: ColorPinListProps) => {
  const domSpec = useRef<DOMRect>();
  const divRef = useRef<HTMLDivElement>();
  const classes = useStyles();
  const [selectedId, setId] = useState();
  const [percentXY, setP] = useState({
    percentX: 0,
    percentY: 0,
  });

  const handleSetSelected = useCallback((id: ID) => {
    return () => setId(id);
  }, [setId]);

  const handleSetSelectedPercent = useCallback((id: ID) => {
    return (percentXY: PercentXY) => {
      setP(percentXY);
      if(props.setSelectedPercent) {
        props.setSelectedPercent(id, percentXY.percentX);
      }
    };
  }, [percentXY]);

  useEffect(() => {
    if(divRef.current) {
      domSpec.current = divRef.current.getBoundingClientRect();
    }
    window.addEventListener('mouseup', () => {
      setId(undefined);
    });
  }, []);

  useEffect(() => {
    if(typeof selectedId === 'number') {
      const setFn = handleSetSelectedPercent(selectedId);
      const clientPercentFn = getClientPercent(domSpec.current)(setFn);
      window.addEventListener('mousemove', clientPercentFn);
      return () => window.removeEventListener('mousemove', clientPercentFn);
    }
  }, [selectedId]);

  return (
    <RootRef rootRef={divRef}>
      <Box className={classes.root}>
        {/* <span>
          {`selectedId: ${selectedId}, (${percentXY.percentX}, ${percentXY.percentY})`}
        </span> */}
        {props.gradientItemValueList.map(v => (
          <ColorPinItem 
            isSelected={v.id === selectedId}
            position={{
              x: 0,
              y: 20,
            }}
            key={v.id}
            gradientItemValue={v}
            clickFn={handleSetSelected(v.id)} />
        ))}
      </Box>
    </RootRef>
  );
};

export default ColorPinList;