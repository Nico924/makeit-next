import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

describe('Loading', () => {
  it('should render without crashing', () => {
    shallow(<Loading />);
  });
});
