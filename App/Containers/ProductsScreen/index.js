import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'
import { path } from 'ramda'

import { Colors } from '../../Themes'

export function ProductsScreen ({ navigation }) {
  const [listName, setListName] = useState('')

  useEffect(() => {
    const name = path(['state', 'params', 'list', 'name'], navigation)
    if (name) setListName(name)
  }, [navigation])

  return (
    <Wrapper>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name='chevron-left' size={24} color={Colors.black} />
        </BackButton>
        <Title>{listName}</Title>
        <AddButton onPress={() => {}}>
          <AddButtonContent>+</AddButtonContent>
        </AddButton>
      </Header>
    </Wrapper>
  )
}

ProductsScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default ProductsScreen

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

const AddButton = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  border-radius: 20px;
  background-color: ${Colors.blue};
  align-items: center;
  justify-content: center;
`

const AddButtonContent = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${Colors.white};
  line-height: 23px;
`
