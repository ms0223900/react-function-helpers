import { mount, shallow } from 'enzyme';
import { createContextStore } from 'functions/contextHelpers';
import ContextWrapperFn from 'functions/ContextWrapper';
import React from 'react';
import renderer from 'react-test-renderer';

describe('test ContextWrapper component', () => {
  it('ContextWrapper should render correctly', () => {
    const contextStateMockData = {
      test: ''
    };
    const customInitStateMock = {test: 'aaa'};
    const contextValueFnMockFn = (a: any) => ({...a});
    const contextStore = createContextStore(contextStateMockData);

    const ContextWrapper = ContextWrapperFn<typeof contextStateMockData>(contextValueFnMockFn, contextStore);

    const tree = renderer.create(
      <ContextWrapper customInitState={customInitStateMock}>
        {'hi'}
      </ContextWrapper>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});