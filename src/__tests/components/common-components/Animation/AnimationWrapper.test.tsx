import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import AnimationWrapper, { AnimationHOC } from 'components/common-components/Animation/AnimationWrapper';

describe('test AnimationWrapper', () => {
  it('should render correctly(with default props)', () => {
    const tree = renderer.create(
      <AnimationWrapper>
        <></>
      </AnimationWrapper>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly(with custom props)', () => {
    const tree = renderer.create(
      <AnimationWrapper 
        animateEffect={'slideOutDown'}
        animationDuration={10}
      >
        <></>
      </AnimationWrapper>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('HOC should render correctly', () => {
    const MockComponent = (props: { test: string }) => <></>;
    const AnimatedComponent = AnimationHOC(MockComponent);
    const tree = renderer.create(
      <AnimatedComponent test={''} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});