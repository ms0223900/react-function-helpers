import React, { useReducer, useCallback } from 'react';
import { Box } from '@material-ui/core';
import GradientResult, { GradientResultProps } from './GradientResult';
import GradientColorsList from './GradientColorsList';
import { ColorPercent } from './types';

export interface State extends GradientResultProps {}

const initGradientItem = {
  color: '#aff',
  percent: 0,
};

const initState = {
  degree: 90,
  gradientItemValueList: [
    initGradientItem,
    {
      color: '#0bd',
      percent: 100,
    }
  ]
};

enum ACTION_TYPES {
  'ADD_COLOR',
  'EDIT_COLOR_PERCENT',
  'EDIT_DEGREE'
}

const addColorAction = () => ({
  type: ACTION_TYPES.ADD_COLOR,
});

interface editColorActionPayload {
  index: number,
  name: ColorPercent,
  value: string,
}
const editColorAction = (payload: editColorActionPayload) => ({
  type: ACTION_TYPES.EDIT_COLOR_PERCENT,
  payload,
});

const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case ACTION_TYPES.ADD_COLOR:
      return ({
        ...state,
        gradientItemValueList: [
          ...state.gradientItemValueList,
          initGradientItem,
        ]
      });
    case ACTION_TYPES.EDIT_COLOR_PERCENT: {
      const {
        index,
        name,
        value
      } = action.payload as editColorActionPayload;
      const newValueList = [...state.gradientItemValueList];
      newValueList[index] = {
        ...newValueList[index],
        [name]: value
      };
      return ({
        ...state,
        gradientItemValueList: newValueList,
      });
    }
    default:
      return state;
  }
};

const GradientContainer = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleAddColor = useCallback(() => {
    dispatch(addColorAction());
  }, []);

  const handleSetColorPercent = useCallback((index: number) => {
    return (nameVal: {
      name: ColorPercent,
      value: string
    }) =>
      dispatch(editColorAction({
        index,
        name: nameVal.name,
        value: nameVal.value,
      }));
  }, []);

  return (
    <Box>
      <GradientResult {...state} />
      <GradientColorsList 
        addColorFn={handleAddColor}
        gradientItemValueList={state.gradientItemValueList}
        editColorPercentFn={handleSetColorPercent} />
    </Box>
  );
};

export default GradientContainer;