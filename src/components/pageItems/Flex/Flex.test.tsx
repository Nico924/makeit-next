import React from 'react';
import { shallow } from 'enzyme';
import Flex from './Flex';

describe('Flex', () => {
  it('should render without crashing', () => {
    shallow(<Flex />);
  });
});
