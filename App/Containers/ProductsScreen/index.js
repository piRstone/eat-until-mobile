import React, { useEffect, useState } from 'react'
import {
  Alert,
  ActivityIndicator,
  FlatList,
  Keyboard,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'
import { path } from 'ramda'

import ListsActions from '../../Redux/ListsRedux'
import ProductsActions from '../../Redux/ProductsRedux'
import ListTitle from '../../Components/ListTitle'
import Product from '../../Components/Product'
import AddButton from '../../Components/AddButton'
import ProductForm from '../../Components/ProductForm'
import { Colors } from '../../Themes'

export function ProductsScreen ({
  navigation,
  getProducts,
  products,
  isLoading,
  createProduct,
  removeList,
  updateListName
}) {
  const [list, setList] = useState({})
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (list.id) {
      getProducts(list.id)
    }
  }, [list])

  // Set list name
  useEffect(() => {
    const list = path(['state', 'params', 'list'], navigation)
    if (list) setList(list)
  }, [navigation])

  const handleSubmit = product => {
    product.listId = list.id
    createProduct(product)
    Keyboard.dismiss()
  }

  const onDeleteListRequest = () => {
    Alert.alert(
      'Supprimer la liste',
      "Si vous supprimer cette liste, tous les produits qu'elle contient seront supprimés eux aussi.",
      [
        { text: 'Annuler' },
        {
          text: 'Supprimer',
          onPress: () => removeList(list.id),
          style: 'destructive'
        }
      ]
    )
  }

  const onUpdateName = name => {
    updateListName(list.id, name)
  }

  return (
    <Wrapper>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name='chevron-left' size={24} color={Colors.black} />
        </BackButton>
        <ListTitle title={list.name} onSubmit={onUpdateName} />
        <AddButton onPress={() => setShowForm(!showForm)} />
      </Header>
      {showForm && <ProductForm onSubmit={handleSubmit} />}
      {isLoading && !products.length ? (
        <EmptyWrapper>
          <EmptyState>Récupération des produits...</EmptyState>
          <ActivityIndicator color={Colors.grey1} />
        </EmptyWrapper>
      ) : (
        <View style={{ flex: 1, marginTop: 10, padding: 10 }}>
          {products.length ? (
            <FlatList
              data={products}
              refreshing={isLoading}
              onRefresh={() => getProducts(list.id)}
              renderItem={({ item }) => <Product data={item} />}
              keyExtractor={item => item.id.toString()}
            />
          ) : (
            <EmptyWrapper>
              <EmptyState>Il n'y a aucun produit dans votre liste.</EmptyState>
            </EmptyWrapper>
          )}
        </View>
      )}
      <DangerButton onPress={onDeleteListRequest}>
        <DangerButtonText>Supprimer la liste</DangerButtonText>
      </DangerButton>
    </Wrapper>
  )
}

ProductsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  products: PropTypes.array,
  isLoading: PropTypes.bool,
  getProducts: PropTypes.func,
  createProduct: PropTypes.func,
  removeList: PropTypes.func,
  updateListName: PropTypes.func
}

const mapStateToProps = state => ({
  products: state.products.data,
  isLoading: state.products.isLoading
})

const mapDispatchToProps = dispatch => ({
  getProducts: listId => dispatch(ProductsActions.request(listId)),
  createProduct: product => dispatch(ProductsActions.create(product)),
  removeList: id => dispatch(ListsActions.remove(id)),
  updateListName: (id, name) => dispatch(ListsActions.updateName(id, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen)

const Wrapper = styled.SafeAreaView`
  flex: 1;
  padding: 0 10px;
`

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`

const BackButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`

const EmptyWrapper = styled.View`
  flex-direction: column;
  padding-top: 300px;
  align-items: center;
  justify-content: center;
`

const EmptyState = styled.Text`
  font-size: 16px;
  color: ${Colors.grey1};
  margin-bottom: 10px;
`

const DangerButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px 20px;
`

const DangerButtonText = styled.Text`
  font-size: 14px;
  color: ${Colors.red};
`
