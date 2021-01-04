import React from 'react';
import { shallow } from 'enzyme';
import InlineContactForm from './InlineContactForm';

describe('InlineContactForm', () => {
  it('should render without crashing', () => {
    shallow(<InlineContactForm />);
  });
});
