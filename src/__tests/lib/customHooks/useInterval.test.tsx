import React from 'react';
import { shallow, mount } from 'enzyme';
import useInterval, { UseInterval, updateFn } from '../../../lib/customHooks/useInterval';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  jest.resetAllMocks();
  jest.useFakeTimers();
  jest.clearAllTimers();
});

const refreshCount = 129;
const secondsPerStep = 1;
const refreshCallback = jest.fn();
const params: UseInterval = {
  refreshCount,
  secondsPerStep,
  refreshCallback,
};

describe('test updateFn', () => {
  const update = updateFn(params);

  it('if number is equal to refreshCount, it should call refreshCallback', () => {
    expect(refreshCallback).not.toBeCalled();

    const res = update(refreshCount);
    expect(refreshCallback).toBeCalled();
    expect(res).toEqual(0);
  });

  it('test number is "not" equal to refreshCount, it should return "input + 1"', () => {
    const num = 0;
    const res = update(num);
    expect(refreshCallback).not.toBeCalled();
    expect(res).toEqual(num + 1);
  });
});


describe('test useInterval', () => {
  const mockPassedTime = 1000;
  const MockComponentFn = (secondsPerStep?: number) => {
    return () => {
      const {
        timeNow,
        manualRefresh
      } = useInterval({
        ...params,
        secondsPerStep,
      });
      return (
        <>
          <span>{timeNow}</span>
          <button onClick={manualRefresh} />
        </>
      );
    };
  };
  
  it('should plus 1 after a unit of secondsPerStep passed(default)', () => {
    const MockComponentDefaultSeconds = MockComponentFn();
    const wrapper = mount(
      <MockComponentDefaultSeconds />
    );
    act(() => {
      jest.advanceTimersByTime(mockPassedTime);
    });
    expect(wrapper.find('span').text()).toEqual(String(mockPassedTime / 1000));
  });

  it('should plus 1 after a unit of secondsPerStep passed(default)', () => {
    const secondsPerStep = 2;
    const passedTime = 2000;
    const MockComponentCustomSeconds = MockComponentFn(2);
    const wrapper = mount(
      <MockComponentCustomSeconds />
    );
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const time = String(passedTime / 1000 / secondsPerStep);
    expect(wrapper.find('span').text()).toEqual(time);
  });

  it('should call refreshCallback after trigger manualRefresh function', () => {
    const MockComponent = MockComponentFn();
    const wrapper = mount(
      <MockComponent />
    );
    expect(refreshCallback).not.toBeCalled();

    act(() => {
      jest.advanceTimersByTime(mockPassedTime);
      const { onClick } = wrapper.find('button').props();
      onClick && onClick({} as any);
    });

    expect(wrapper.find('span').text()).toEqual('0');
    expect(refreshCallback).toBeCalled();
  });
});

