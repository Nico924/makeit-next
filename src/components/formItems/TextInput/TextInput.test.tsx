import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './TextInput';

describe('TextInput', () => {
  it('should render without crashing', () => {
    shallow(<TextInput />);
  });
});
