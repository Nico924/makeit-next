
import React from 'react';
import { shallow } from 'enzyme';
import CustomIcon from './CustomIcon';

describe('CustomIcon', () => {
  it('should render without crashing', () => {
    shallow(<CustomIcon icon="user" />);
  });
});
