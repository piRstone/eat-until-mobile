import React, { useState, useRef } from 'react'
import { ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import UserActions from '../../Redux/UserRedux'
import TextInput from '../../Components/TextInput'
import { Colors } from '../../Themes'

export function LoginScreen ({ isLoading, login }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passwordFieldRef = useRef()

  const onSubmit = () => {
    login(email, password)
  }

  return (
    <Wrapper>
      <Title>Eat Until</Title>
      <Body>
        <TextInput
          label='Email'
          onChangeText={setEmail}
          inputProps={{
            value: email,
            autoCorrect: false,
            autoCapitalize: 'none',
            keyboardType: 'email-address',
            placeholder: 'email@domaine.fr',
            autoFocus: true,
            returnKeyType: 'next',
            onSubmitEditing: () => passwordFieldRef.current.focus()
          }}
        />
        <TextInput
          label='Mot de passe'
          onChangeText={setPassword}
          inputProps={{
            ref: passwordFieldRef,
            value: password,
            secureTextEntry: true,
            placeholder: '********',
            returnKeyType: 'done',
            onSubmitEditing: onSubmit
          }}
        />
      </Body>
      <StyledButton
        disabled={!email || !password || isLoading}
        onPress={onSubmit}>
        {isLoading ? (
          <ActivityIndicator color={Colors.black} />
        ) : (
          <ButtonText>Connexion</ButtonText>
        )}
      </StyledButton>
    </Wrapper>
  )
}

LoginScreen.propTypes = {
  isLoading: PropTypes.bool,
  login: PropTypes.func
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(UserActions.login(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const Wrapper = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
`

const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: ${Colors.black};
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
`

const Body = styled.View`
  width: 90%;
  flex-direction: column;
  box-shadow: 0 0 32px rgba(0,0,0,.1);
  box-shadow: 0 30px 30px rgba(0,0,0,.1);
  border-radius: 10px;
  background-color: #fff;
`

const StyledButton = styled.TouchableOpacity`
  height: 40px;
  width: 90%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${props => props.disabled ? Colors.grey2 : Colors.blue};
  margin-top: 20px;
`

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.white};
`
