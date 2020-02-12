import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import AnimatedTimerQueueWrapper, {
  getDefaultAnimationDurationFromIntervalSeconds
} from 'components/common-components/Animation/AnimatedTimerQueueWrapper';

describe('test AnimatedTimerQueueWrapper wrapper', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <AnimatedTimerQueueWrapper>
        <></>
        <></>
      </AnimatedTimerQueueWrapper>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('test getDefaultAnimationDurationFromIntervalSeconds function', () => {
    const animationDuration = 10;
    const props = {
      intervalSeconds: 1,
    };
    const defaultFromIntervalSeconds = getDefaultAnimationDurationFromIntervalSeconds(props);
    expect(defaultFromIntervalSeconds).toEqual(props.intervalSeconds);

    const _animationDuration = getDefaultAnimationDurationFromIntervalSeconds({
      ...props,
      animationDuration,
    });
    expect(_animationDuration).toEqual(animationDuration);
  });
});