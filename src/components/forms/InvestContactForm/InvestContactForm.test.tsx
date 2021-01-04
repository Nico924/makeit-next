import React from 'react';
import { shallow } from 'enzyme';
import InvestContactForm from './InvestContactForm';

describe('InvestContactForm', () => {
  it('should render without crashing', () => {
    shallow(<InvestContactForm />);
  });
});
