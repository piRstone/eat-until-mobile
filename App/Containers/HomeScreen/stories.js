import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import { HomeScreen } from '.'

storiesOf('Containers/HomeScreen')
  .add('Default', () => <HomeScreen logout={action('logout')} />)
