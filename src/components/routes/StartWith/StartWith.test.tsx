import React from 'react';
import { shallow } from 'enzyme';
import StartWith from './StartWith';

describe('StartWith', () => {
  it('should render without crashing', () => {
    shallow(<StartWith />);
  });
});
