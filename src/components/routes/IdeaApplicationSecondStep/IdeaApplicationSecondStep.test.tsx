import React from 'react';
import { shallow } from 'enzyme';
import IdeaApplicationSecondStep from './IdeaApplicationSecondStep';

describe('IdeaApplicationSecondStep', () => {
  it('should render without crashing', () => {
    shallow(<IdeaApplicationSecondStep />);
  });
});
