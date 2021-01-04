// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Footer from './Footer';

storiesOf('newComponents/Footer', module).add('Default', () => <Footer />);
