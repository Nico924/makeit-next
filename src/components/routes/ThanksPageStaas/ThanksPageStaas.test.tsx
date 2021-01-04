import React from 'react';
import { shallow } from 'enzyme';
import ThanksPageStaas from './ThanksPageStaas';

describe('ThanksPageStaas', () => {
  it('should render without crashing', () => {
    shallow(<ThanksPageStaas />);
  });
});
