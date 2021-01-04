import React from 'react';
import { shallow } from 'enzyme';
import CustomMarketingForm from './CustomMarketingForm';

describe('CustomMarketingForm', () => {
  it('should render without crashing', () => {
    shallow(<CustomMarketingForm />);
  });
});
