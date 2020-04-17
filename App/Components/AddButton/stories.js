import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import AddButton from '.';

storiesOf('Components/AddButton')
  .add('Default', () => <AddButton onPress={action('pressed')} />)
  .add('Opened', () => <AddButton opened onPress={action('pressed')} />);
