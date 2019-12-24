import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import UserActions from '../../Redux/UserRedux'
import ListsActions from '../../Redux/ListsRedux'
import AddButton from '../../Components/AddButton'
import ListForm from '../../Components/ListForm'
import { Colors } from '../../Themes'

export function ListsScreen ({
  navigation,
  logout,
  lists,
  isLoading,
  isCreateLoading,
  getLists,
  createList
}) {
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      getLists()
    }, 10)
  }, [])

  const handleListPress = list => {
    navigation.navigate('ProductsScreen', { list })
  }

  const handleSubmit = value => {
    if (value !== '') {
      createList(value)
      Keyboard.dismiss()
    }
  }

  return (
    <Wrapper>
      <Header>
        <UserPic onPress={logout}>
          <Icon name='sign-out' size={20} color={Colors.black} />
        </UserPic>
        <AddButton onPress={() => setShowForm(!showForm)} />
      </Header>
      <Title>Mes listes</Title>
      <KeyboardAvoidingView behavior='height' enabled={showForm}>
        <ScrollView>
          {lists.map(list => (
            <List key={list.id} onPress={() => handleListPress(list)}>
              <ListName>{list.name}</ListName>
              <Icon name='chevron-right' size={16} color={Colors.grey1} />
            </List>
          ))}
          {showForm && (
            <ListForm onSubmit={handleSubmit} isLoading={isCreateLoading} />
          )}
          {isLoading && <ActivityIndicator color={Colors.black} />}
        </ScrollView>
      </KeyboardAvoidingView>
    </Wrapper>
  )
}

ListsScreen.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object),
  logout: PropTypes.func,
  isLoading: PropTypes.bool,
  isCreateLoading: PropTypes.bool,
  getLists: PropTypes.func,
  createList: PropTypes.func
}

const mapStateToProps = state => ({
  lists: state.lists.data,
  isLoading: state.lists.isLoading,
  isCreateLoading: state.lists.isCreateLoading
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserActions.logout()),
  getLists: () => dispatch(ListsActions.request()),
  createList: name => dispatch(ListsActions.create(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListsScreen)

const Wrapper = styled.SafeAreaView`
  margin: 40px 20px;
`

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`

const UserPic = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.lightgrey};
`

const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: ${Colors.black};
  margin-bottom: 20px;
`

const List = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  padding: 30px 10px;
  background-color: ${Colors.lightgrey};
  margin-bottom: 5px;
`

const ListName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`
