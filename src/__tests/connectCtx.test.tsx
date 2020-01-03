import { mount, shallow } from 'enzyme';
import connectCtx from 'functions/connectCtx';
import { MapContextToProps, MapStateToProps } from 'functions/mapContextToProps';
import React, { createContext, Dispatch } from 'react';
import renderer, { act } from 'react-test-renderer';

describe('test connectCtx function', () => {
  const context = {
    dispatch: (x: any) =>x,
    state: {
      a: 'a',
      b: 'b'
    },
  };
  type State = typeof context['state']
  const contextStore = createContext(context);
  const Component = () => <></>;

  it('should wrap component and render correctly', () => {
    const ConnectCtxComponent = connectCtx(contextStore)()(Component);
    const tree = renderer.create(
      <ConnectCtxComponent />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should map state to props if parameter has mapStateToProps', () => {
    const mapStateToProps: MapStateToProps<State, {}, { a: string }> = (state) => {
      return ({
        a: state.a,
      });
    };
    const MyComponent = (props: {
      a: string
    }) => <>{props.a}</>;
    const ConnectCtxComponent = connectCtx(contextStore)(mapStateToProps)(MyComponent);
    const wrapper = mount(
      <ConnectCtxComponent />
    );
    expect(wrapper.find(MyComponent).props().a).toEqual(context.state.a);
  });

  it('should map dispatch to props if parameter has mapDispatchToProps', () => {
    const fn = jest.fn().mockImplementation((x: string) => x);
    const mapDispatchToProps: MapContextToProps<Dispatch<any>, {
      a: string
    }, {
      fn: (x: string) => any
    }> = (dispatch) => {
      return ({
        fn: (x) => dispatch(fn(x)),
      });
    };
    const MyComponent = (props: {
      fn: (x: string) => any,
      a: string
    }) => <></>;

    const ConnectCtxComponent = connectCtx(contextStore)(undefined, mapDispatchToProps)(MyComponent);
    const wrapper = mount(
      <ConnectCtxComponent a={''} />
    );
    act(() => {
      wrapper.find(MyComponent).props().fn('hello');
    });
    expect(fn).toBeCalledWith('hello');
  });

});