import React from 'react';
import { shallow } from 'enzyme';
import NewsLetterForm from './NewsLetterForm';

describe('NewsLetterForm', () => {
  it('should render without crashing', () => {
    shallow(<NewsLetterForm />);
  });
});
