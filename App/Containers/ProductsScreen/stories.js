import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import { ProductsScreen } from '.'

storiesOf('Containers/ProductsScreen').add('Default', () => (
  <ProductsScreen {...requiredProps} />
))

const requiredProps = {
  navigation: {
    goBack: action('back')
  }
}
