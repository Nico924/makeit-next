import React from 'react';
import { shallow } from 'enzyme';
import Blurb from './Blurb';

describe('Blurb', () => {
  it('should render without crashing', () => {
    shallow(<Blurb />);
  });
});
