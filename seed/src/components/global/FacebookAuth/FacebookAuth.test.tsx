import React from 'react';
import { shallow } from 'enzyme';
import FacebookAuth from './FacebookAuth';

describe('FacebookAuth', (): void => {
  it('should render without crashing', (): void => {
    shallow(<FacebookAuth config={{ appId: '1234' }} />);
  });
});
