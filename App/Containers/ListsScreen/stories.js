import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import { ListsScreen } from '.';

storiesOf('Containers/ListsScreen', module).add('Default', () => (
  <ListsScreen logout={action('logout')} />
));
