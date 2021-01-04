import React from 'react';
import { shallow } from 'enzyme';
import ThanksPagePartners from './index';

describe('ThanksPagePartners', () => {
  it('should render without crashing', () => {
    shallow(<ThanksPagePartners />);
  });
});
