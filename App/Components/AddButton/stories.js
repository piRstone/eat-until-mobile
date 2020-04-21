import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { addDecorator } from '@storybook/react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import { Colors } from '../../Themes';
import AddButton from '.';

const Wrapper = s => (
  <ThemeProvider theme={Colors()}>{() => s()}</ThemeProvider>
);

addDecorator(Wrapper);

storiesOf('Components/AddButton')
  .add('Default', () => <AddButton onPress={action('pressed')} />)
  .add('Opened', () => <AddButton opened onPress={action('pressed')} />);
