import React, { useEffect, useState, useCallback } from 'react';
import { Alert, FlatList, Keyboard, View } from 'react-native';
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

export function ProductsScreen({
  t,
  navigation,
  getProducts,
  products,
  isLoading,
  createProduct,
  removeProduct,
  removeList,
  updateListName,
}) {
  const [list, setList] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (list.id) {
      getProducts(list.id);
    }
  }, [list, getProducts]);

  // Set list name
  useEffect(() => {
    const paramStateList = path(['state', 'params', 'list'], navigation);
    if (paramStateList) {
      setList(paramStateList);
    }
  }, [navigation]);

  const handleSubmit = product => {
    product.listId = list.id;
    createProduct(product);
    Keyboard.dismiss();
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
        {showForm && <ProductForm onSubmit={handleSubmit} />}
        {isLoading && !products.length ? (
          <EmptyWrapper>
            <EmptyState>{t('products:productsRetrieval')}</EmptyState>
            <StyledActivityIndicator />
          </EmptyWrapper>
        ) : (
          <View style={{ flex: 1, marginTop: 10, padding: 10 }}>
            {products.length ? (
              <FlatList
                data={products}
                refreshing={isLoading}
                onRefresh={() => getProducts(list.id)}
                renderItem={({ item }) => (
                  <Product data={item} onRemove={handleRemoveProduct} />
                )}
                keyExtractor={item => item.id.toString()}
              />
            ) : (
              <EmptyWrapper>
                <EmptyState>{t('products:noProducts')}</EmptyState>
              </EmptyWrapper>
            )}
          </View>
        )}
        <DangerButton onPress={onDeleteListRequest}>
          <DangerButtonText>{t('products:deleteList')}</DangerButtonText>
        </DangerButton>
      </InnerWrapper>
    </Wrapper>
  );
}

ProductsScreen.propTypes = {
  t: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  products: PropTypes.array,
  isLoading: PropTypes.bool,
  getProducts: PropTypes.func,
  createProduct: PropTypes.func,
  removeProduct: PropTypes.func,
  removeList: PropTypes.func,
  updateListName: PropTypes.func,
};

const mapStateToProps = state => ({
  products: state.products.data,
  isLoading: state.products.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getProducts: listId => dispatch(ProductsActions.request(listId)),
  createProduct: product => dispatch(ProductsActions.create(product)),
  removeProduct: (id, inventoryId) =>
    dispatch(ProductsActions.remove(id, inventoryId)),
  removeList: id => dispatch(ListsActions.remove(id)),
  updateListName: (id, name) => dispatch(ListsActions.updateName(id, name)),
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
  flex-direction: column;
  padding-top: 300px;
  align-items: center;
  justify-content: center;
`;

const EmptyState = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 16px;
  color: ${props => props.theme.grey1};
  margin-bottom: 10px;
`;

const DangerButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.whiteBackground};
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px 20px;
`;

const DangerButtonText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 14px;
  color: ${props => props.theme.red};
`;
