import React from 'react';
import { shallow } from 'enzyme';
import Suggestions from './Suggestions';

const dumbList = [
  { value: 'one', label: 'one' },
  { value: 'two', label: 'two' },
];

describe('Suggestions', (): void => {
  it('should render without crashing', (): void => {
    shallow(
      <Suggestions items={dumbList} filter>
        <div>Click me</div>
      </Suggestions>,
    );
  });
});
