import React from 'react';
import { action } from '@storybook/addon-actions';
import GradientItem, { GradientItemProps } from '../components/common-components/Gradient/GradientItem';
import { GradientResult } from '../components/common-components/Gradient';
import { GradientResultProps } from '../components/common-components/Gradient/GradientResult';
import ColorPinList from '../components/common-components/Gradient/ColorPinList';
import DegreePointerContainer from '../components/common-components/Gradient/DegreePointerContainer';
import GradientContainer from '../components/common-components/Gradient/GradientContainer';
import FilterSelectorContainer from '../components/common-components/FilterSelector/FilterSelectorContainer';
import { SelectorOptions } from '../components/common-components/FilterSelector/types';

const gradientItemProps: GradientItemProps = {
  values: {
    id: 0,
    color: '#aff',
    percent: 0,
  }
};

const gradientResultProps: GradientResultProps = {
  degree: 90,
  gradientItemValueList: [
    {
      id: 0,
      color: '#aff',
      percent: 0,
    },
    {
      id: 1,
      color: '#0bd',
      percent: 100,
    }
  ]
};

const options: SelectorOptions = [
  { value: 'aa', text: 'AA', },
  { value: 'bb', text: 'BB', },
  { value: 'bb', text: 'BB', },
  { value: 'bb', text: 'BB', },
  { value: 'bb', text: 'BB', },
  { value: 'bb', text: 'BB', },
  { value: 'bb', text: 'BB', },
  { value: 'bb', text: 'BB', },
  { value: 'bb', text: 'BB', },
  { value: 'bb', text: 'BB', },
];

export const GradientItemComponent = () => (
  <GradientItem {...gradientItemProps} />
);

export const degreePointer = () => (
  <DegreePointerContainer />
);

export const gradientResult = () => (
  <GradientResult {...gradientResultProps} />
);

export const colorPinList = () => (
  <ColorPinList
    gradientItemValueList={gradientResultProps.gradientItemValueList} />
);

export const gradientContainer = () => (
  <GradientContainer />
);

export const filterSelector = () => (
  <FilterSelectorContainer
    defaultSelectedText={'select something'}
    getSelectedOptionFn={action('getSelectedOption')}
    options={options} />
);

export default {
  title: 'Common Components',
};