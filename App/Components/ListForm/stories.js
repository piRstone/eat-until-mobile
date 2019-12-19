import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import ListForm from '.'

storiesOf('Components/ListForm')
  .add('Default', () => (
    <ListForm onSubmit={action('submitted')} />
  ))
  .add('Loading', () => (
    <ListForm onSubmit={action('submitted')} isLoading />
  ))
