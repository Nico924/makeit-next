import React from 'react';
import { shallow } from 'enzyme';
import ProjectInput from './ProjectInput';

describe('ProjectInput', () => {
  it('should render without crashing', () => {
    shallow(<ProjectInput />);
  });
});
