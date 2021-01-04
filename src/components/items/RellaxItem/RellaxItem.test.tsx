import React from 'react';
import { shallow } from 'enzyme';
import RellaxItem from './RellaxItem';

describe('RellaxItem', () => {
  it('should render without crashing', () => {
    shallow(<RellaxItem />);
  });
});
