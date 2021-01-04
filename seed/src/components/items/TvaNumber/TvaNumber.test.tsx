
import React from 'react';
import { shallow } from 'enzyme';
import TvaNumber from './TvaNumber';

describe('TvaNumber', () => {
  it('should render without crashing', () => {
    shallow(<TvaNumber value="001212122" />);
  });
});
