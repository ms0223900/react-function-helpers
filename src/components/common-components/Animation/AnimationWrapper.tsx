import { Box } from '@material-ui/core';
import { HOC } from 'all-common-types';
import React, { ReactElement, ReactNode } from 'react';
import 'styles/styles.scss';

const defaultAnimate = 'slideInDown';
const defaultAnimationDuration = 1;
const defaultAnimationDelay = 0;

export interface AnimationWrapperWithoutChildrenProps {
  animateEffect?: string
  animationDelay?: number
  animationDuration?: number
}
export interface AnimationWrapperProps extends AnimationWrapperWithoutChildrenProps {
  children: ReactNode
}

const AnimationWrapper = ({
  animateEffect=defaultAnimate,
  animationDelay=defaultAnimationDelay,
  animationDuration=defaultAnimationDuration,
  children,
}: AnimationWrapperProps) => {
  return (
    <Box 
      style={{ 
        animationDuration: `${animationDuration - animationDelay}s`,
        animationDelay: `${animationDelay}s`,
        // animationIterationCount: 'infinite',
        animationFillMode: 'forwards', 
      }}  
      className={`${animateEffect}`}
    >
      {children}
    </Box>
  );
};

type AnimationHOC = HOC<AnimationWrapperWithoutChildrenProps>
export const AnimationHOC: AnimationHOC = (Component) => {
  return props => (
    <AnimationWrapper {...props}>
      <Component {...props} />
    </AnimationWrapper>
  );
};

export default AnimationWrapper;