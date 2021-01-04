import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Field } from 'react-final-form';
import { text, object, boolean } from '@storybook/addon-knobs';
import { required } from 'store/utils/validation';
import Password from './Password';

storiesOf('seed/formItems/Password', module)
  .addDecorator(story => {
    const Wrapper = <Form onSubmit={() => {}} render={story} />;
    return <Wrapper />;
  })
  .add('default', () => <Field name="test" component={Password} label="Password" />)
  .add('custom', () => (
    <Field
      name="test"
      component={Password}
      placeholder={text('placeholder', '')}
      // For Form element in general
      noMargin={boolean('noMargin', false)}
      // For InputWrapper
      withBorder={boolean('withBorder', false)}
      withValueBorder={boolean('withValueBorder', false)}
      effect={boolean('effect', false)}
      showScore={boolean('showScore', true)}
      noDefaultIcon={boolean('noDefaultIcon', false)}
      small={boolean('small', false)}
      iconLeft={text('iconLeft', '')}
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
      errorStyle={object('errorStyle', {})}
      // other
      validate={required}
    />
  ));
