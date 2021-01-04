import React from 'react';
import { shallow } from 'enzyme';
import JobMain from './JobMain';

describe('JobMain', () => {
  it('should render without crashing', () => {
    shallow(<JobMain />);
  });
});
