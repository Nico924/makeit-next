import React from 'react';
import { shallow } from 'enzyme';
import Partners from './index';

describe('Partners', () => {
  it('should render without crashing', () => {
    shallow(<Partners />);
  });
});
