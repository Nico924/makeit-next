import React from 'react';
import { shallow } from 'enzyme';
import Job from './Job';

describe('Job', () => {
  it('should render without crashing', () => {
    shallow(<Job />);
  });
});
