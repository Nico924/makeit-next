import React from 'react';
import { shallow } from 'enzyme';
import CustomHubSpotForm from './CustomHubSpotForm';

describe('CustomHubSpotForm', () => {
  it('should render without crashing', () => {
    shallow(<CustomHubSpotForm />);
  });
});
