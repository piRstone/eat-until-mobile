import React from 'react';
import { storiesOf } from '@storybook/react-native';
import moment from 'moment';

import Product from '.';

storiesOf('Components/Product', module)
  .add('Default', () => <Product data={product} />)
  .add('Warning', () => <Product data={productWarning} />)
  .add('Danger', () => <Product data={productDanger} />);

const product = {
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
};

const productWarning = {
  ...product,
  expires_at: moment()
    .add('4', 'd')
    .format('YYYY-MM-DD'),
};

const productDanger = {
  ...product,
  expires_at: moment()
    .add('2', 'd')
    .format('YYYY-MM-DD'),
};
