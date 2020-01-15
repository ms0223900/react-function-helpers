import React from 'react';
import renderer from 'react-test-renderer';
import { ColorItem } from 'components/common-components/colorPickerTool/ColorItem';
import { shallow, mount } from 'enzyme';
import { CheckCircle } from '@material-ui/icons';

describe('test ColorItem', () => {
  const props = {
    color: '',
    isPicked: false
  };
  it('should render correctly', () => {
    const tree = renderer.create(
      <ColorItem {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have "CheckCircle" component if isPicked is true, vice versa.', () => {
    const wrapper = shallow(
      <ColorItem {...props} />
    );
    expect(wrapper.find(CheckCircle)).toHaveLength(0);

    const wrapperPicked = shallow(
      <ColorItem {...props} isPicked={true} />
    );
    expect(wrapperPicked.find(CheckCircle)).toHaveLength(1);
  });
});