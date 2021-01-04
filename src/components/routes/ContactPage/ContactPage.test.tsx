import React from 'react';
import { shallow } from 'enzyme';
import ContactPage from './index';

describe('ContactPage', () => {
  it('should render without crashing', () => {
    shallow(<ContactPage />);
  });
});
