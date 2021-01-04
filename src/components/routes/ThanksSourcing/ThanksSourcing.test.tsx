import React from 'react';
import { shallow } from 'enzyme';
import ThanksSourcing from './ThanksSourcing';

describe('ThanksSourcing', () => {
  it('should render without crashing', () => {
    shallow(<ThanksSourcing />);
  });
});
