
import React from 'react';
import { shallow } from 'enzyme';
import DateItem from './DateItem';

describe('DateItem', () => {
  it('should render without crashing', () => {
    shallow(<DateItem date={new Date().toISOString()} />);
  });
});
