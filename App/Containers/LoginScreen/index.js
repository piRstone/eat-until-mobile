import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import UserActions from '../../Redux/UserRedux';
import TextInput from '../../Components/TextInput';

export function LoginScreen({ isLoading, login, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordFieldRef = useRef();

  const onSubmit = () => {
    if (email.length && password.length) {
      login(email, password);
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>Eat Until</Title>
        <Body>
          <TextInput
            label="Email"
            onChangeText={setEmail}
            inputProps={{
              value: email,
              autoCorrect: false,
              autoCapitalize: 'none',
              keyboardType: 'email-address',
              placeholder: 'email@domaine.fr',
              autoFocus: true,
              returnKeyType: 'next',
              onSubmitEditing: () => passwordFieldRef.current.focus(),
            }}
          />
          <TextInput
            label="Mot de passe"
            onChangeText={setPassword}
            inputProps={{
              ref: passwordFieldRef,
              value: password,
              secureTextEntry: true,
              placeholder: '********',
              returnKeyType: 'done',
              onSubmitEditing: onSubmit,
            }}
          />
        </Body>
        <StyledButton disabled={!email || !password} onPress={onSubmit}>
          {isLoading ? (
            <StyledActivityIndicator />
          ) : (
            <ButtonText>Connexion</ButtonText>
          )}
        </StyledButton>
        {error && <ErrorMessage>{JSON.stringify(error)}</ErrorMessage>}
      </InnerWrapper>
    </Wrapper>
  );
}

LoginScreen.propTypes = {
  isLoading: PropTypes.bool,
  login: PropTypes.func,
  error: PropTypes.object,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(UserActions.login(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  color: ${props => props.theme.black};
`;

const Title = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 40px;
  color: ${props => props.theme.black};
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
`;

const Body = styled.View`
  width: 90%;
  flex-direction: column;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.1);
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
`;

const StyledButton = styled.TouchableOpacity`
  height: 40px;
  width: 90%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${props =>
    props.disabled ? props.theme.grey2 : props.theme.blue};
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 18px;
  color: ${props => props.theme.white};
`;

const ErrorMessage = styled.Text`
  width: 90%;
  font-size: 12px;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.red};
  padding: 2px 5px;
  border-radius: 3px;
  margin-top: 20px;
`;
