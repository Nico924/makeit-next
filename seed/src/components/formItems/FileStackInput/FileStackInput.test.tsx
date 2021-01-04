import React from 'react';
import { shallow } from 'enzyme';
import FileStackInput from './FileStackInput';

describe('FileStackInput', () => {
  it('should render without crashing', () => {
    shallow(<FileStackInput />);
  });
});
