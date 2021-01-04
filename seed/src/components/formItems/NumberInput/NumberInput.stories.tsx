/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm, Field } from 'redux-form';
import { text, boolean, object, number } from '@storybook/addon-knobs';
import { required } from 'store/utils/validation';

import NumberInput from './NumberInput';

storiesOf('seed/formItems/NumberInput', module)
  .addDecorator(story => {
    const Wrapper = reduxForm({ form: 'test' })(() => story());
    return <Wrapper />;
  })
  .add('default', () => (
    <Field name="test" component={NumberInput} label={text('label', 'Input')} />
  ))
  .add('Custom', () => (
    <Field
      name="test"
      component={NumberInput}
      suffix={text('suffix', '€')}
      decimalSeparator={text('decimalSeparator', '.')}
      decimalScale={number('decimalScale', 2)}
      thousandSeparator={text('thousandSeparator', ' ')}
      disabled={boolean('disabled', false)}
      // For Form element in general
      noMargin={boolean('noMargin', false)}
      // For InputWrapper
      withBorder={boolean('withBorder', false)}
      withValueBorder={boolean('withValueBorder', false)}
      effect={boolean('effect', false)}
      small={boolean('small', false)}
      iconLeft={text('iconLeft', '')}
      iconRight={text('iconRight', '')}
      // For label
      label={text('label', 'Label')}
      labelIcon={text('labelIcon', '')}
      // styling
      fieldWrapperStyle={object('fieldWrapperStyle', {})}
      labelStyle={object('labelStyle', {})}
      labelIconStyle={object('labelIconStyle', {})}
      valueStyle={object('valueStyle', {})}
      iconLeftStyle={object('iconLeftStyle', {})}
      iconRightStyle={object('iconRightStyle', {})}
      validate={required}
    />
  ));
