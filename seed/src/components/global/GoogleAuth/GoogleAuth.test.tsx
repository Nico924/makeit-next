
import React from 'react';
import { shallow } from 'enzyme';
import GoogleAuth from './GoogleAuth';

describe('GoogleAuth', () => {
  it('should render without crashing', () => {
    shallow(<GoogleAuth loginGoogle={() => {}} config={{ auth: '1234' }} />);
  });
});
