import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import { path } from 'ramda'

import ProductsActions from '../../Redux/ProductsRedux'
import AddButton from '../../Components/AddButton'
import ProductForm from '../../Components/ProductForm'
import { Colors } from '../../Themes'

export function ProductsScreen ({ navigation, getProducts, products, createProduct }) {
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
    console.tron.log(product)
    createProduct(product)
  }

  return (
    <Wrapper>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name='chevron-left' size={24} color={Colors.black} />
        </BackButton>
        <Title>{list.name}</Title>
        <AddButton onPress={() => setShowForm(!showForm)} />
      </Header>
      {showForm && (
        <ProductForm onSubmit={handleSubmit} />
      )}
    </Wrapper>
  )
}

ProductsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  products: PropTypes.array,
  getProducts: PropTypes.func,
  createProduct: PropTypes.func
}

const mapStateToProps = state => ({
  products: state.products.data
})

const mapDispatchToProps = dispatch => ({
  getProducts: listId => dispatch(ProductsActions.request(listId)),
  createProduct: product => dispatch(ProductsActions.create(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen)

const Wrapper = styled.SafeAreaView`
  flex: 1;
`

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 20px;
`

const BackButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
`
