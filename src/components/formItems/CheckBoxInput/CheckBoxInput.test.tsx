import React from 'react';
import { shallow } from 'enzyme';
import CheckBoxInput from './CheckBoxInput';

describe('CheckBoxInput', () => {
  it('should render without crashing', () => {
    shallow(<CheckBoxInput />);
  });
});
