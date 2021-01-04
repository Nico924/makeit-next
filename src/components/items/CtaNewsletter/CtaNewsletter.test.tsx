import React from 'react';
import { shallow } from 'enzyme';
import CtaNewsletter from './CtaNewsletter';

describe('CtaNewsletter', () => {
  it('should render without crashing', () => {
    shallow(<CtaNewsletter />);
  });
});
