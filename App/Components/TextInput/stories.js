import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import TextInput from '.';

storiesOf('Components/TextInput', module).add('Default', () => (
  <TextInput
    label="Identifiant"
    onChangeText={action('onChangeText')}
    inputProps={{
      placeholder: 'mon-email@truc.com',
    }}
  />
));
