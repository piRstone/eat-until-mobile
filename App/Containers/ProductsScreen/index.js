import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  Platform,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { path } from 'ramda';
import { withTranslation } from 'react-i18next';

import ListsActions from '../../Redux/ListsRedux';
import ProductsActions from '../../Redux/ProductsRedux';
import ListTitle from '../../Components/ListTitle';
import Product from '../../Components/Product';
import AddButton from '../../Components/AddButton';
import ProductForm from '../../Components/ProductForm';
import ProductEditModal from './ProductEditModal';

export function ProductsScreen({
  t,
  navigation,
  getProducts,
  allProducts,
  isLoading,
  isEditLoading,
  editError,
  isEmptyLoading,
  createProduct,
  editProduct,
  removeProduct,
  removeList,
  updateListName,
  emptyList,
}) {
  const [list, setList] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(undefined);
  const [isKeybordOpened, setiIsKeybordOpened] = useState(false);

  const showListener = useRef();
  const hideListener = useRef();

  // Init list
  // Check if keyboard is opened
  useEffect(() => {
    if (list.id) {
      getProducts(list.id);
    }

    showListener.current = Keyboard.addListener('keyboardDidShow', () =>
      setiIsKeybordOpened(true),
    );
    hideListener.current = Keyboard.addListener('keyboardDidHide', () =>
      setiIsKeybordOpened(false),
    );

    return () => {
      showListener.current.remove();
      hideListener.current.remove();
    };
  }, [list, getProducts]);

  // Set list name
  useEffect(() => {
    const paramStateList = path(['state', 'params', 'list'], navigation);
    if (paramStateList) {
      setList(paramStateList);
    }
  }, [navigation]);

  const handleSubmit = product => {
    product.inventoryId = list.id;
    createProduct(product);
    Keyboard.dismiss();
  };

  const onEmptyListRequest = () => {
    Alert.alert(t('products:emptyList'), t('products:emptyListText'), [
      { text: t('products:cancel') },
      {
        text: t('products:delete'),
        onPress: () => emptyList(list.id),
        style: 'destructive',
      },
    ]);
  };

  const onDeleteListRequest = () => {
    Alert.alert(t('products:deleteList'), t('products:deleteListText'), [
      { text: t('products:cancel') },
      {
        text: t('products:delete'),
        onPress: () => removeList(list.id),
        style: 'destructive',
      },
    ]);
  };

  const onUpdateName = name => {
    updateListName(list.id, name);
  };

  const handleRemoveProduct = useCallback(
    id => {
      removeProduct(id, list.id);
    },
    [list, removeProduct],
  );

  const handleEditProduct = product => {
    setShowEditModal(true);
    setProductToEdit(product);
  };

  const onEditModalClose = () => {
    setShowEditModal(false);
    setProductToEdit(undefined);
  };

  const products = list && allProducts[list.id] ? allProducts[list.id] : [];
  return (
    <Wrapper>
      <InnerWrapper>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <StyledBackIcon name="chevron-left" size={24} />
          </BackButton>
          <ListTitle title={list.name} onSubmit={onUpdateName} />
          <AddButton onPress={() => setShowForm(!showForm)} opened={showForm} />
        </Header>
        {showForm && (
          <ProductForm onSubmit={handleSubmit} navigation={navigation} />
        )}
        {isLoading && !products.length ? (
          <EmptyWrapper>
            <EmptyState>{t('products:productsRetrieval')}</EmptyState>
            <StyledActivityIndicator />
          </EmptyWrapper>
        ) : (
          <View style={{ flex: 1, marginTop: 10 }}>
            {products.length ? (
              <FlatList
                data={products}
                refreshing={isLoading}
                onRefresh={() => getProducts(list.id)}
                renderItem={({ item }) => (
                  <Product
                    data={item}
                    onRemove={handleRemoveProduct}
                    onEdit={handleEditProduct}
                  />
                )}
                keyExtractor={item => item.id.toString()}
              />
            ) : (
              <>
                {!isKeybordOpened && (
                  <EmptyWrapper>
                    <EmptyState>{t('products:noProducts')}</EmptyState>
                  </EmptyWrapper>
                )}
              </>
            )}
          </View>
        )}
        {!isKeybordOpened && (
          <DangerZone>
            <DangerButton
              onPress={onEmptyListRequest}
              disabled={!products.length}>
              {isEmptyLoading ? (
                <ActivityIndicator color="#ea0000" />
              ) : (
                <DangerButtonText disabled={!products.length}>
                  {t('products:emptyList')}
                </DangerButtonText>
              )}
            </DangerButton>
            <DangerButton onPress={onDeleteListRequest}>
              <DangerButtonText>{t('products:deleteList')}</DangerButtonText>
            </DangerButton>
          </DangerZone>
        )}
      </InnerWrapper>
      <ProductEditModal
        visible={showEditModal}
        product={productToEdit}
        onDismiss={onEditModalClose}
        onRequestClose={onEditModalClose}
        onSubmit={(id, product) => editProduct(id, product, list.id)}
        onDelete={handleRemoveProduct}
        isLoading={isEditLoading}
        error={editError}
      />
    </Wrapper>
  );
}

ProductsScreen.propTypes = {
  t: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  allProducts: PropTypes.object,
  isLoading: PropTypes.bool,
  isEditLoading: PropTypes.bool,
  editError: PropTypes.object,
  isEmptyLoading: PropTypes.bool,
  getProducts: PropTypes.func,
  createProduct: PropTypes.func,
  editProduct: PropTypes.func,
  removeProduct: PropTypes.func,
  removeList: PropTypes.func,
  updateListName: PropTypes.func,
  emptyList: PropTypes.func,
};

const mapStateToProps = state => ({
  allProducts: state.products.data,
  isLoading: state.products.isLoading,
  isEditLoading: state.products.isEditLoading,
  isEmptyLoading: state.products.isEmptyLoading,
});

const mapDispatchToProps = dispatch => ({
  getProducts: listId => dispatch(ProductsActions.request(listId)),
  createProduct: product => dispatch(ProductsActions.create(product)),
  removeProduct: (id, inventoryId) =>
    dispatch(ProductsActions.remove(id, inventoryId)),
  editProduct: (id, product, inventoryId) =>
    dispatch(ProductsActions.edit(id, product, inventoryId)),
  removeList: id => dispatch(ListsActions.remove(id)),
  updateListName: (id, name) => dispatch(ListsActions.updateName(id, name)),
  emptyList: id => dispatch(ProductsActions.empty(id)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withTranslation(),
)(ProductsScreen);

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.SafeAreaView`
  margin: 0 10px;
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;

const BackButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const StyledBackIcon = styled(Icon)`
  color: ${props => props.theme.black};
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  color: ${props => props.theme.grey1};
`;

const EmptyWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmptyState = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 16px;
  color: ${props => props.theme.grey1};
  margin-bottom: 10px;
  text-align: center;
`;

const DangerZone = styled.View`
  flex-direction: row;
`;

const DangerButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  border: ${props =>
    props.disabled
      ? `1px solid ${props.theme.grey1}`
      : `1px solid ${props.theme.red}`};
  border-radius: 10px;
  margin: 10px 5px;
  padding: 12px 20px 7px;
  padding-bottom: ${Platform.OS === 'ios' ? '7px' : '12px'};
`;

const DangerButtonText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 14px;
  color: ${props => (props.disabled ? props.theme.grey1 : props.theme.red)};
`;
