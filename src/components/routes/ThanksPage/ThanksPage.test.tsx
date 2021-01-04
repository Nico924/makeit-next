import React from 'react';
import { shallow } from 'enzyme';
import ThanksPage from './ThanksPage';

describe('ThanksPage', () => {
  it('should render without crashing', () => {
    shallow(<ThanksPage />);
  });
});
