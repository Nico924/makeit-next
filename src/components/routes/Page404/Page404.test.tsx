import React from 'react';
import { shallow } from 'enzyme';
import Page404 from './Page404';

describe('Page404', () => {
  it('should render without crashing', () => {
    shallow(<Page404 />);
  });
});
