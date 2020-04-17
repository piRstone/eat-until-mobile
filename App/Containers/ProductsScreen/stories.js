import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import moment from 'moment';

import { ProductsScreen } from '.';

storiesOf('Containers/ProductsScreen')
  .add('Default', () => (
    <ProductsScreen {...requiredProps} products={products} />
  ))
  .add('Empty', () => <ProductsScreen {...requiredProps} />)
  .add('Loading', () => <ProductsScreen {...requiredProps} isLoading />);

const requiredProps = {
  navigation: {
    goBack: action('back'),
    state: {
      params: {
        list: { name: 'Courses', id: 1 },
      },
    },
  },
  getProducts: action('getProducts'),
  createProduct: action('createProduct'),
  isLoading: false,
  products: [],
};

const products = [
  {
    name: 'Tomates',
    description: 'Produit',
    code_value: '0000000000000',
    code_type: 'ean13',
    notify_before: 2,
    expires_at: moment()
      .add('6', 'd')
      .format('YYYY-MM-DD'),
    shopping_list_id: 1,
    updated_at: '2019-12-22 14:54:33',
    created_at: '2019-12-22 14:54:33',
    id: 1,
  },
];
