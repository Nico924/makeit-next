import React from 'react';
import { shallow } from 'enzyme';
import ThankYou from './ThankYou';

describe('ThankYou', () => {
  it('should render without crashing', () => {
    shallow(<ThankYou />);
  });
});
