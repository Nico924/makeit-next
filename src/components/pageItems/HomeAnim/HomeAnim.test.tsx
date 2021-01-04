import React from 'react';
import { shallow } from 'enzyme';
import HomeAnim from './HomeAnim';

describe('HomeAnim', () => {
  it('should render without crashing', () => {
    shallow(<HomeAnim />);
  });
});
