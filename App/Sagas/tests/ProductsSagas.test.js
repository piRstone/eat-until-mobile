import { call, put } from 'redux-saga/effects';
import i18n from 'i18next';

import FixtureAPI from '../../Services/FixtureApi';
import {
  retrieveProducts,
  createProduct,
  editProduct,
  removeProduct,
} from '../ProductsSagas';
import NotificationActions from '../../Redux/NotificationRedux';
import { types } from '../../Containers/Notification';
import ProductsActions from '../../Redux/ProductsRedux';

describe('retrieveProducts', () => {
  let generator;
  let inventoryId;
  beforeEach(() => {
    generator = retrieveProducts(FixtureAPI, { inventoryId });
  });

  it('should call getList request', () => {
    expect(generator.next().value).toEqual(
      call(FixtureAPI.getProducts, inventoryId),
    );
  });

  it('should dispatch success action', () => {
    generator.next(); // call

    const response = FixtureAPI.getProducts();

    expect(generator.next(response).value).toEqual(
      put(ProductsActions.success(response.data)),
    );
  });

  it('should dispatch failure action', () => {
    generator.next(); // call

    const response = { ok: false, data: 'Error' };

    expect(generator.next(response).value).toEqual(
      put(ProductsActions.failure(response.data)),
    );
  });
});

describe('createProduct', () => {
  let generator;
  const product = {
    name: 'Tomatoes',
    expiresAt: '2020-02-18',
    notifyBefore: 3,
    inventoryId: 1,
    ean13: '3857465746578',
  };

  beforeEach(() => {
    generator = createProduct(FixtureAPI, { product });
  });

  const formattedProduct = {
    name: product.name,
    expiration_date: product.expiresAt,
    notification_delay: parseInt(product.notifyBefore, 10),
    inventory: product.inventoryId,
    ean13: product.ean13,
  };

  it('should call createProduct request', () => {
    expect(generator.next().value).toEqual(
      call(FixtureAPI.createProduct, formattedProduct),
    );
  });

  it('should dispatch createSuccess action', () => {
    generator.next(); // call

    const response = FixtureAPI.createProduct();

    expect(generator.next(response).value).toEqual(
      put(ProductsActions.createSuccess(response.data, product.inventoryId)),
    );
    expect(generator.next().value).toEqual(
      put(
        NotificationActions.display(
          i18n.t('products:productAdded'),
          types.success,
        ),
      ),
    );
  });

  it('should dispatch failure action', () => {
    generator.next(); // call

    const response = { ok: false, data: 'Error' };

    expect(generator.next(response).value).toEqual(
      put(ProductsActions.createFailure(response.data)),
    );
    expect(generator.next().value).toEqual(
      put(
        NotificationActions.display(
          i18n.t('notification:serverError'),
          types.danger,
        ),
      ),
    );
  });
});

describe('editProduct', () => {
  let generator;
  const id = 12;
  const inventoryId = 1;
  const product = {
    name: 'Tomatoes',
    expirationDate: '2020-05-18',
    notificationDelay: '3',
  };
  beforeEach(() => {
    generator = editProduct(FixtureAPI, { id, product, inventoryId });
  });

  it('should call editProduct request', () => {
    const formattedProduct = {
      name: 'Tomatoes',
      expiration_date: '2020-05-18',
      notification_delay: '3',
    };
    expect(generator.next().value).toEqual(
      call(FixtureAPI.editProduct, id, formattedProduct),
    );
  });

  it('should dispatch editSuccess action', () => {
    generator.next(); // call

    const response = FixtureAPI.editProduct();

    expect(generator.next(response).value).toEqual(
      put(ProductsActions.editSuccess(id, response.data, inventoryId)),
    );
    expect(generator.next().value).toEqual(
      put(ProductsActions.request(inventoryId)),
    );
    expect(generator.next().value).toEqual(
      put(
        NotificationActions.display(
          i18n.t('products:productEdited'),
          types.success,
        ),
      ),
    );
  });

  it('should dispatch failure action', () => {
    generator.next(); // call

    const response = { ok: false, data: 'Error' };

    expect(generator.next(response).value).toEqual(
      put(ProductsActions.editFailure(response.data)),
    );
    expect(generator.next().value).toEqual(
      put(
        NotificationActions.display(
          i18n.t('notification:serverError'),
          types.danger,
        ),
      ),
    );
  });
});

describe('removeProduct', () => {
  let generator;
  const id = 12;
  const inventoryId = 1;
  beforeEach(() => {
    generator = removeProduct(FixtureAPI, { id, inventoryId });
  });

  it('should call removeProduct request', () => {
    expect(generator.next().value).toEqual(call(FixtureAPI.removeProduct, id));
  });

  it('should dispatch removeSuccess action', () => {
    generator.next(); // call

    const response = FixtureAPI.removeProduct();

    expect(generator.next(response).value).toEqual(
      put(ProductsActions.removeSuccess(id, inventoryId)),
    );
    expect(generator.next().value).toEqual(
      put(ProductsActions.request(inventoryId)),
    );
    expect(generator.next().value).toEqual(
      put(
        NotificationActions.display(
          i18n.t('products:productDeleted'),
          types.success,
        ),
      ),
    );
  });

  it('should dispatch failure action', () => {
    generator.next(); // call

    const response = { ok: false, data: 'Error' };

    expect(generator.next(response).value).toEqual(
      put(ProductsActions.removeFailure(response.data)),
    );
    expect(generator.next().value).toEqual(
      put(
        NotificationActions.display(
          i18n.t('notification:serverError'),
          types.danger,
        ),
      ),
    );
  });
});
