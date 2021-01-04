import React from 'react';
import { shallow } from 'enzyme';
import TestimonialCard from './TestimonialCard';

describe('TestimonialCard', () => {
  it('should render without crashing', () => {
    shallow(<TestimonialCard />);
  });
});
