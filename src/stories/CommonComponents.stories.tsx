import React from 'react';
import GradientItem, { GradientItemProps } from '../components/common-components/Gradient/GradientItem';
import { GradientResult } from '../components/common-components/Gradient';
import { GradientResultProps } from '../components/common-components/Gradient/GradientResult';
import GradientContainer from '../components/common-components/Gradient/GradientContainer';

const gradientItemProps: GradientItemProps = {
  values: {
    color: '#aff',
    percent: 0,
  }
};

const gradientResultProps: GradientResultProps = {
  degree: 90,
  gradientItemValueList: [
    {
      color: '#aff',
      percent: 0,
    },
    {
      color: '#0bd',
      percent: 100,
    }
  ]
};

export const GradientItemComponent = () => (
  <GradientItem {...gradientItemProps} />
);

export const gradientResult = () => (
  <GradientResult {...gradientResultProps} />
);

export const gradientContainer = () => (
  <GradientContainer />
);

export default {
  title: 'Common Components',
};