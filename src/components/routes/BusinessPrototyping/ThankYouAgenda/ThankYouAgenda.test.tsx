import React from 'react';
import { shallow } from 'enzyme';
import ThankYouAgenda from './ThankYouAgenda';

describe('ThankYouAgenda', () => {
  it('should render without crashing', () => {
    shallow(<ThankYouAgenda />);
  });
});
