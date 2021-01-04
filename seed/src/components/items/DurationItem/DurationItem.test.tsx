import React from 'react';
import { shallow } from 'enzyme';
import DurationItem from './DurationItem';

describe('DurationItem', () => {
  it('should render without crashing', () => {
    shallow(<DurationItem />);
  });
});
