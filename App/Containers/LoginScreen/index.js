import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';

import UserActions from '../../Redux/UserRedux';
import TextInput from '../../Components/TextInput';
const logo = require('../../Images/logo.png');

export function LoginScreen({ t, navigation, isLoading, login, error }) {
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
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always">
        <InnerWrapper>
          <Title>Eat Until</Title>
          <LogoImage source={logo} />
          <Body>
            <TextInput
              label="Email"
              onChangeText={setEmail}
              inputProps={{
                value: email,
                autoCorrect: false,
                autoCapitalize: 'none',
                keyboardType: 'email-address',
                placeholder: t('login:emailPlaceholder'),
                autoFocus: true,
                returnKeyType: 'next',
                onSubmitEditing: () => passwordFieldRef.current.focus(),
              }}
            />
            <TextInput
              label={t('login:password')}
              onChangeText={setPassword}
              noBorderBottom
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
          <ForgotPasswordWrapper
            onPress={() =>
              navigation.navigate('ForgotPasswordScreen', { email })
            }>
            <SmallLink>{t('login:forgotPassword')}</SmallLink>
          </ForgotPasswordWrapper>
          <StyledButton disabled={!email || !password} onPress={onSubmit}>
            {isLoading ? (
              <StyledActivityIndicator />
            ) : (
              <ButtonText>{t('login:signIn')}</ButtonText>
            )}
          </StyledButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </InnerWrapper>
      </ScrollView>
    </Wrapper>
  );
}

LoginScreen.propTypes = {
  t: PropTypes.func,
  navigation: PropTypes.object,
  isLoading: PropTypes.bool,
  login: PropTypes.func,
  error: PropTypes.string,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(UserActions.login(email, password)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withTranslation(),
)(LoginScreen);

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.View`
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
  text-align: center;
`;

const LogoImage = styled.Image`
  height: 130px;
  width: 130px;
  margin-bottom: 30px;
`;

const Body = styled.View`
  width: 90%;
  flex-direction: column;
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
    props.disabled ? props.theme.grey2 : props.theme.primary};
  margin-top: 20px;
  padding-top: 7px;
`;

const ButtonText = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 18px;
  color: ${props => props.theme.white};
`;

const ErrorMessage = styled.Text`
  font-family: 'SofiaPro-Bold';
  text-align: center;
  width: 90%;
  font-size: 14px;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.red};
  padding: 7px 5px 0;
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
`;

const ForgotPasswordWrapper = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 10px;
  padding: 0 20px;
`;

const SmallLink = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 14px;
  color: ${props => props.theme.primary};
`;
