import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm, Field } from 'redux-form';
import { text, boolean, object } from '@storybook/addon-knobs';

import CustomSelect from './CustomSelect';

const dumpList = [
  {
    value: 'value1',
    text: 'One',
  },
  {
    value: 'value2',
    text: 'Two',
  },
  {
    value: 'value3',
    text: 'Three',
  },
];

storiesOf('seed/formItems/CustomSelect', module)
  .addDecorator(story => {
    const Wrapper = reduxForm({
      form: 'test',
    })(() => story());
    return <Wrapper />;
  })
  .add('Default', () => (
    <Field name="test" items={dumpList} component={CustomSelect} label="CustomSelect" />
  ))
  .add('Custom', () => (
    <Field
      name="test"
      items={dumpList}
      component={CustomSelect}
      // For custom select
      multipleSelection={boolean('multiple', true)}
      filter={boolean('filter', true)}
      showValues={boolean('showValues', false)}
      smallSuggestion={boolean('smallSuggestion', false)}
      hideArrow={boolean('hideArrow', false)}
      hideIndication={boolean('hideIndication', false)}
      placeholder={text('placeholder', 'Select value')}
      filterPlaceholder={text('filterPlaceholder', 'Filter placeholder')}
      info={text('info', '')}
      // For Form element in general
      noMargin={boolean('noMargin', false)}
      // For InputWrapper
      withBorder={boolean('withBorder', false)}
      withValueBorder={boolean('withValueBorder', false)}
      small={boolean('small (with border)', false)}
      effect={boolean('effect', false)}
      centerValue={boolean('centerValue', false)}
      iconLeft={text('iconLeft', '')}
      iconRight={text('iconRight', '')}
      // For label
      label={text('label', 'Custom select')}
      labelIcon={text('labelIcon', '')}
      // styling
      // specific
      itemsStyle={object('itemsStyle', {})}
      itemStyle={object('itemStyle', {})}
      // input
      fieldWrapperStyle={object('fieldWrapperStyle', {})}
      contentWrapperStyle={object('contentWrapperStyle', {})}
      labelStyle={object('labelStyle', {})}
      labelIconStyle={object('labelIconStyle', {})}
      valueStyle={object('valueStyle', {})}
      iconLeftStyle={object('iconLeftStyle', {})}
      iconRightStyle={object('iconRightStyle', {})}
    />
  ))
  .add('Custom style', () => (
    <Field
      name="test"
      items={dumpList}
      component={CustomSelect}
      // For custom select
      multipleSelection={boolean('multiple', true)}
      // For Form element in general
      noMargin
      // For InputWrapper
      iconLeft="user"
      iconRight="check"
      filter
      withBorder={boolean('withBorder', true)}
      withValueBorder={boolean('withValueBorder', false)}
      small={boolean('small', false)}
      // For label
      label="Custom select"
      placeholder="Select values"
      labelIcon="user"
      // styling
      // specific
      itemsStyle={object('itemsStyle', {
        color: 'blue',
        border: '1px solid red',
        borderTop: 'none',
      })}
      itemStyle={object('itemStyle', {
        border: '1px solid darkred',
      })}
      labelStyle={object('labelStyle', {
        border: '1px solid orange',
      })}
      fieldWrapperStyle={object('fieldWrapperStyle', {
        fontSize: '16px',
        border: '1px solid orange',
      })}
      contentWrapperStyle={object('contentWrapperStyle', {
        border: '1px solid lightblue',
      })}
      labelIconStyle={object('labelIconStyle', {
        color: 'orange',
      })}
      valueStyle={object('valueStyle', {
        color: 'teal',
        border: '1px solid red',
      })}
      iconLeftStyle={object('iconLeftStyle', {
        color: 'purple',
        border: '1px solid purple',
      })}
      iconRightStyle={object('iconRightStyle', {
        color: 'purple',
        border: '1px solid purple',
      })}
    />
  ))
  .add('With value border', () => (
    <Field
      name="test"
      items={dumpList}
      component={CustomSelect}
      // For Form element in general
      // For InputWrapper
      iconLeft="user"
      iconRight="check"
      withValueBorder
      // For label
      label="Custom select"
      placeholder="Select values"
      // styling
      // specific
      itemsStyle={object('itemsStyle', {})}
      itemStyle={object('itemStyle', {})}
      // FieldWrapper
      fieldWrapperStyle={object('fieldWrapperStyle', {
        fontSize: '16px',
        border: '1px solid lightblue',
        color: 'green',
      })}
      contentWrapperStyle={object('contentWrapperStyle', {
        border: '1px solid orange',
      })}
      labelStyle={object('labelStyle', {
        border: '1px solid blue',
      })}
      labelIconStyle={object('labelIconStyle', {
        color: 'orange',
      })}
      valueStyle={object('valueStyle', {
        color: 'black',
        border: '1px solid red',
      })}
      iconLeftStyle={object('iconLeftStyle', {
        color: '#AAA',
      })}
      iconRightStyle={object('iconRightStyle', {
        color: 'light-green',
      })}
    />
  ));
