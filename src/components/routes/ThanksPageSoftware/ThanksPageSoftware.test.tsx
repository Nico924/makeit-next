import React from 'react';
import { shallow } from 'enzyme';
import ThanksPageSoftware from './index';

describe('ThanksPageSoftware', () => {
  it('should render without crashing', () => {
    shallow(<ThanksPageSoftware />);
  });
});
