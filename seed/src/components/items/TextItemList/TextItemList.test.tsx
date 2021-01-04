import React from 'react';
import { shallow } from 'enzyme';
import TextItemList from './TextItemList';

describe('TextItemList', () => {
  it('should render without crashing', () => {
    shallow(<TextItemList />);
  });
});
