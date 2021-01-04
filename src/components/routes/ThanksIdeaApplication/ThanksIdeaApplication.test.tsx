import React from 'react';
import { shallow } from 'enzyme';
import ThanksIdeaApplication from './index';

describe('ThanksIdeaApplication', () => {
  it('should render without crashing', () => {
    shallow(<ThanksIdeaApplication />);
  });
});
