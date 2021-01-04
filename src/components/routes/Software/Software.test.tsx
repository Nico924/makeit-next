import React from 'react';
import { shallow } from 'enzyme';
import Software from './index';

describe('Software', () => {
  it('should render without crashing', () => {
    shallow(<Software />);
  });
});
