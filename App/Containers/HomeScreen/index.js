import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { Button, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import UserActions from '../../Redux/UserRedux'
import ListsActions from '../../Redux/ListsRedux'
import { Colors } from '../../Themes'

export function HomeScreen ({ navigation, logout, lists, getLists, isLoading }) {
  useEffect(() => {
    setTimeout(() => {
      getLists()
    }, 10)
  }, [])

  return (
    <Wrapper>
      <Header>
        <UserPic>
          <Icon name='user' size={20} color={Colors.black} />
        </UserPic>
        <Button title='Logout' onPress={logout} />
      </Header>
      <Title>Mes listes</Title>
      {lists.map(list => (
        <List
          key={list.id}
          onPress={() => navigation.navigate('LoginScreen')}>
          <ListName>{list.name}</ListName>
          <Icon name='chevron-right' size={16} color={Colors.grey1} />
        </List>
      ))}
      {isLoading && <ActivityIndicator color={Colors.black} />}
    </Wrapper>
  )
}

HomeScreen.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object),
  logout: PropTypes.func,
  isLoading: PropTypes.bool,
  getLists: PropTypes.func
}

const mapStateToProps = state => ({
  lists: state.lists.data,
  isLoading: state.lists.isLoading
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserActions.logout()),
  getLists: () => dispatch(ListsActions.request())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const Wrapper = styled.SafeAreaView`
  margin: 40px 20px;
`

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`

const UserPic = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
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
  background-color: #fafafa;
`

const ListName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`
