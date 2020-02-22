import { Box } from '@material-ui/core';
import React, { useCallback, useReducer } from 'react';
import GradientColorsList from './GradientColorsList';
import GradientResult, { GradientResultProps } from './GradientResult';
import { ColorPercent } from './types';
import reducer from './reducers';
import { addColor, editColor, deleteColor } from './actions';
import { ID } from 'all-common-types';
import GradientResultContainer from './GradientResultContainer';

export type State = GradientResultProps

export const initGradientItem = {
  id: 0,
  color: '#aff',
  percent: 0,
};

const initState = {
  degree: 90,
  gradientItemValueList: [
    initGradientItem,
    {
      id: 1,
      color: '#0bd',
      percent: 100,
    }
  ]
};

const GradientContainer = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleAddColor = useCallback(() => {
    dispatch(addColor());
  }, []);

  const handleDeleteColor = useCallback((id: ID) => {
    return () => dispatch(deleteColor({ id }));
  }, []);

  const handleSetColorPercent = useCallback((id: ID) => {
    return (nameVal: {
      name: ColorPercent,
      value: string
    }) => {
      const action = editColor({
        id,
        name: nameVal.name,
        value: nameVal.value,
      });
      dispatch(action);
    };
  }, []);

  const handleSetPercent = useCallback((id: ID, percent: number) => {
    const action = editColor({
      id,
      name: 'percent',
      value: String(percent),
    });
    dispatch(action);
  }, []);

  return (
    <Box>
      <GradientResultContainer {...state} />
      <GradientColorsList 
        addColorFn={handleAddColor}
        deleteColorFn={handleDeleteColor}
        gradientItemValueList={state.gradientItemValueList}
        editColorPercentFn={handleSetColorPercent}
        setSelectedPercentFn={handleSetPercent} />
    </Box>
  );
};

export default GradientContainer;