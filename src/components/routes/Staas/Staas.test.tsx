import React from 'react';
import { shallow } from 'enzyme';
import Staas from './Staas';

describe('Staas', () => {
  it('should render without crashing', () => {
    shallow(<Staas />);
  });
});
