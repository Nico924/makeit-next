import React from 'react';
import { shallow } from 'enzyme';
import DateTimePicker from './DateTimePicker';

describe('DateTimePicker', () => {
  it('should render without crashing', () => {
    shallow(<DateTimePicker />);
  });
});
