import React from 'react';
import { shallow } from 'enzyme';
import JobIndividual from './JobIndividual';

describe('JobIndividual', () => {
  it('should render without crashing', () => {
    shallow(<JobIndividual />);
  });
});
