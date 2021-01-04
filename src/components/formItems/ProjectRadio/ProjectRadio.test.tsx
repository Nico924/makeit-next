import React from 'react';
import { shallow } from 'enzyme';
import ProjectRadio from './ProjectRadio';

describe('ProjectRadio', () => {
  it('should render without crashing', () => {
    shallow(<ProjectRadio />);
  });
});
