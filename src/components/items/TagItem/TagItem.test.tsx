import React from 'react';
import { shallow } from 'enzyme';
import TagItem from './TagItem';

describe('TagItem', () => {
  it('should render without crashing', () => {
    shallow(<TagItem />);
  });
});
