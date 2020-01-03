import { mount, shallow } from 'enzyme';
import { createContextStore, createContextValueFn, MyContext } from 'functions/contextHelpers';
import { HookWrapper } from 'lib/TestHookWrapper';
import React, { createContext, Reducer } from 'react';

describe('test contextHelpers functions', () => {
  it('test createContextStore', () => {
    const createContextFn = jest.spyOn(React, 'createContext');
    const dispatch = jest.fn();
    const initStateMock = {};
    const expectData = {
      dispatch,
      state: initStateMock
    };
    createContextStore(initStateMock, dispatch);
    expect(createContextFn).toBeCalledWith(expectData);
  });
});

describe('test createContextValueFn', () => {
  const initStateMock = {
    a: 'a'
  };
  const customStateMock = {
    b: 'b'
  };
  const reducers: Reducer<typeof initStateMock, {}> = (state, action) => state;
  const contextValue = createContextValueFn(initStateMock, reducers);
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
    expect(state).toEqual(initStateMock);

  });

  it('test createContextValueFn(with customInitState)', () => {
    const expectData = {
      ...initStateMock,
      ...customStateMock,
    };
    const wrapper = shallow(
      <Wrapper customInitState={customStateMock} />
    );
    const { state } = wrapper.find<{
      hook: MyContext<any>
    }>(HookWrapper).props().hook;
    expect(state).toEqual(expectData);
  });
  
});
