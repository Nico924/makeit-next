import React from 'react';
import { shallow } from 'enzyme';
import PrivacyPolicy from './PrivacyPolicy';

describe('PrivacyPolicy', () => {
  it('should render without crashing', () => {
    shallow(<PrivacyPolicy />);
  });
});
