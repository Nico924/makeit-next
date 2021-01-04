import React from 'react';
import { shallow } from 'enzyme';
import PartnerLogo from './PartnerLogo';

describe('PartnerLogo', () => {
  it('should render without crashing', () => {
    shallow(<PartnerLogo />);
  });
});
