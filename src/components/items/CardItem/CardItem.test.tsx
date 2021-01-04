import React from 'react';
import { shallow } from 'enzyme';
import CardItem from './CardItem';

describe('CardItem', () => {
  it('should render without crashing', () => {
    shallow(<CardItem />);
  });
});
