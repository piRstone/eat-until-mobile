import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import ProductForm from '.'

storiesOf('Components/ProductForm').add('Default', () => (
  <ProductForm onSubmit={() => action('onSubmit')} />
))
