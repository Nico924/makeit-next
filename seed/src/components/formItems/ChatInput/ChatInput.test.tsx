import React from 'react';
import { shallow } from 'enzyme';
import ChatInput from './ChatInput';

describe('ChatInput', () => {
  it('should render without crashing', () => {
    shallow(<ChatInput />);
  });
});
