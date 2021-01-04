import React from 'react';
import { shallow } from 'enzyme';
import JobThanksPage from './JobThanksPage';

describe('JobThanksPage', () => {
  it('should render without crashing', () => {
    shallow(<JobThanksPage />);
  });
});
