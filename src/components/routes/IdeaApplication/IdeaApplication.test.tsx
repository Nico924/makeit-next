import React from 'react';
import { shallow } from 'enzyme';
import IdeaApplication from './IdeaApplication';

describe('IdeaApplication', () => {
  it('should render without crashing', () => {
    shallow(<IdeaApplication />);
  });
});
