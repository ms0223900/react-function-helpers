import { mount, shallow } from 'enzyme';
import makeContextToProps, { MapContextToProps } from 'functions/mapContextToProps';
import React from 'react';

describe('test mapStateToProps', () => {
  const state = {
    a: 'a'
  };
  // const dispatch = () => {};
  const ownProps = {
    number: 1,
  };
  interface PropsFromState {
    a: string,
    b: number
  }
  const mapContextToProps: MapContextToProps<typeof state, typeof ownProps, PropsFromState> = (s, p) => {
    return ({
      a: s.a,
      b: p.number,
    });
  };

  it('should return empty object if there is "no" mapStateToProps function', () => {
    const result = makeContextToProps(state, ownProps);
    expect(result).toEqual({});
  });

  it('should return mapStateToProps if there is mapStateToProps function', () => {
    const result = makeContextToProps(state, ownProps, mapContextToProps);
    expect(result).toEqual(mapContextToProps(state, ownProps));
  });
});