import React from 'react';
import { shallow } from 'enzyme';
import CodeInput from './index';

describe('CodeInput', () => {
  it('should render without crashing', () => {
    shallow(<CodeInput />);
  });
});
