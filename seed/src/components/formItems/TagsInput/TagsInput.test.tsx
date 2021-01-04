import React from 'react';
import { shallow } from 'enzyme';
import TagsInput from './TagsInput';

describe('TagsInput', () => {
  it('should render without crashing', () => {
    shallow(<TagsInput />);
  });
});
