import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Button from '.';

storiesOf('Components/Button').add('Default', () => (
  <Button title="A simple button" onPress={action('pressed')} />
));
