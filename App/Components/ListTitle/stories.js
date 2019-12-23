import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import ListTitle from '.'

storiesOf('Components/ListTitle')
  .add('Default', () => <ListTitle title='Ma liste' onSubmit={action('onSubmit')} />)
