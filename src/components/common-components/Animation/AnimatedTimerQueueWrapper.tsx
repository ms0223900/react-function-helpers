import React, { ReactNodeArray } from 'react';
import AnimationWrapper, { AnimationWrapperWithoutChildrenProps } from './AnimationWrapper';
import TimerQueueWrapper from './TimerQueueWrapper';

export interface AnimatedTimerQueueWrapperProps extends AnimationWrapperWithoutChildrenProps {
  intervalSeconds?: number
  children: ReactNodeArray
}

export interface IntervalAndAnimationTimes {
  intervalSeconds?: number,
  animationDuration?: number
}

export const getDefaultAnimationDurationFromIntervalSeconds = ({ intervalSeconds, animationDuration }: IntervalAndAnimationTimes) => (
  typeof animationDuration === 'number' ? animationDuration : intervalSeconds
);

const AnimatedTimerQueueWrapper = (props: AnimatedTimerQueueWrapperProps) => {
  const animationDuration = getDefaultAnimationDurationFromIntervalSeconds(props);
  const Children = React.Children.map(props.children, (child) => (
    <AnimationWrapper 
      {...props}
      animationDuration={animationDuration}
    >
      {child}
    </AnimationWrapper>
  ));

  return (
    <TimerQueueWrapper {...props}>
      {Children}
    </TimerQueueWrapper>
  );
};

export default AnimatedTimerQueueWrapper;