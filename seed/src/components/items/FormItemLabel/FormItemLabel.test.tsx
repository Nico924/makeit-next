import React from 'react';
import { shallow } from 'enzyme';
import FormItemLabel from './FormItemLabel';

describe('FormItemLabel', () => {
  it('should render without crashing', () => {
    shallow(<FormItemLabel label="Label" />);
  });
});
