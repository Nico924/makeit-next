import React from 'react';
import { shallow } from 'enzyme';
import InvestIllustration from './InvestIllustration';

describe('InvestIllustration', () => {
  it('should render without crashing', () => {
    shallow(<InvestIllustration />);
  });
});
