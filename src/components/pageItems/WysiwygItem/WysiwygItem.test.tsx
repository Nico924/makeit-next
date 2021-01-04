import React from 'react';
import { shallow } from 'enzyme';
import WysiwygItem from './WysiwygItem';

describe('WysiwygItem', () => {
  it('should render without crashing', () => {
    shallow(<WysiwygItem />);
  });
});
