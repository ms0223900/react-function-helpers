import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer, { act }  from 'react-test-renderer';
import TimerQueueWrapper from 'components/common-components/Animation/TimerQueueWrapper';

jest.useFakeTimers();

describe('test TimerQueueWrapper wrapper', () => {
  const intervalSeconds = 5;
  const Child1 = () => <></>;
  const Child2 = () => <></>;

  it('should render correctly', () => {
    const tree = renderer.create(
      <TimerQueueWrapper>
        <Child1 />
        <Child2 />
      </TimerQueueWrapper>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('test children in wrapper should changed intervally(defined by intervalSeconds)', () => {
    const wrapper = mount(
      <TimerQueueWrapper intervalSeconds={intervalSeconds}>
        <Child1 />
        <Child2 />
      </TimerQueueWrapper>
    );
    expect(wrapper.find(Child1)).toHaveLength(1);
    expect(wrapper.find(Child2)).toHaveLength(0);
    
    act(() => {
      jest.advanceTimersByTime(intervalSeconds * 1000 + 1);
      wrapper.update();
    });
    
    expect(wrapper.find(Child1)).toHaveLength(0);
    expect(wrapper.find(Child2)).toHaveLength(1);
  });
});