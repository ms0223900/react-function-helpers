import React, { createContext, Reducer } from 'react';
import { shallow, mount } from 'enzyme';
import { createContextStore, createContextValueFn, MyContext } from 'functions/contextHelpers';
import { HookWrapper } from 'lib/TestHookWrapper';

describe('test contextHelpers functions', () => {
  it('test createContextStore', () => {
    const createContextFn = jest.spyOn(React, 'createContext');
    const dispatch = jest.fn();
    const initState_mock = {};
    const _expect = {
      dispatch,
      state: initState_mock
    };
    createContextStore(initState_mock, dispatch);
    expect(createContextFn).toBeCalledWith(_expect);
  });

  
});

describe('test createContextValueFn', () => {
  const initState_mock = {
    a: 'a'
  };
  const customState_mock = {
    b: 'b'
  };
  const reducers: Reducer<typeof initState_mock, {}> = (state, action) => state;
  const contextValue = createContextValueFn(initState_mock, reducers);
  const Wrapper = ({ customInitState }: {
    customInitState?: any
  }) => {
    const value = contextValue(customInitState);
    return <HookWrapper hook={value} />;
  };

  it('test createContextValueFn(without customInitState)', () => {
    
    const wrapper = shallow(
      <Wrapper />
    );
    const { state } = wrapper.find<{
      hook: MyContext<any>
    }>(HookWrapper).props().hook;
    expect(state).toEqual(initState_mock);

  });

  it('test createContextValueFn(with customInitState)', () => {
    const _expect = {
      ...initState_mock,
      ...customState_mock,
    };
    const wrapper = shallow(
      <Wrapper customInitState={customState_mock} />
    );
    const { state } = wrapper.find<{
      hook: MyContext<any>
    }>(HookWrapper).props().hook;
    expect(state).toEqual(_expect);
  });
  
});
