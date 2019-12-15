import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { Button } from 'react-native'

import UserActions from '../../Redux/UserRedux'

export function HomeScreen ({ logout }) {
  return (
    <Wrapper>
      <Text>HomeScreen</Text>
      <Button title='Logout' onPress={logout} />
    </Wrapper>
  )
}

HomeScreen.propTypes = {
  logout: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserActions.logout())
})

export default connect(undefined, mapDispatchToProps)(HomeScreen)

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #000;
`

const Text = styled.Text`
  color: #fff;
`
