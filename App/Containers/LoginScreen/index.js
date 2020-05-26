import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';

import UserActions from '../../Redux/UserRedux';
import TextInput from '../../Components/TextInput';
import Button from '../../Components/Button';
const logo = require('../../Images/logo.png');

export function LoginScreen({
  t,
  navigation,
  storedEmail,
  isLoading,
  login,
  error,
}) {
  const [email, setEmail] = useState(storedEmail || '');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const passwordFieldRef = useRef();

  const checkEmail = () => {
    if (email.length) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(email)) {
        setInvalidEmail(true);
      } else {
        setInvalidEmail(false);
      }
    }
  };

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
            <LoginRow>
              <LoginText>{t('login:signIn')}</LoginText>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <RegisterLink>{t('login:signUp')}</RegisterLink>
              </TouchableOpacity>
            </LoginRow>
            <TextInput
              label="Email"
              onChangeText={setEmail}
              invalid={invalidEmail}
              errorMessage={t('login:invalidEmail')}
              inputProps={{
                value: email,
                autoCorrect: false,
                autoCapitalize: 'none',
                keyboardType: 'email-address',
                placeholder: t('login:emailPlaceholder'),
                returnKeyType: 'next',
                onSubmitEditing: () => passwordFieldRef.current.focus(),
                onBlur: checkEmail,
                onFocus: () => invalidEmail && setInvalidEmail(false),
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
          <Button
            title={t('login:signIn')}
            isLoading={isLoading}
            disabled={!email || !password || invalidEmail}
            onPress={onSubmit}
          />
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
  storedEmail: PropTypes.string,
  login: PropTypes.func,
  error: PropTypes.string,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  storedEmail: state.user.email,
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
  margin: 0 20px;
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
  width: 100%;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${props => props.theme.grey2};
  overflow: hidden;
`;

const LoginRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  padding-bottom: ${Platform.OS === 'ios' ? '0px' : '7px'};
`;

const LoginText = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 16px;
  color: ${props => props.theme.grey1};
`;

const ErrorMessage = styled.Text`
  font-family: 'SofiaPro-Bold';
  text-align: center;
  width: 90%;
  font-size: 14px;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.red};
  padding: 7px 5px 0;
  padding-bottom: ${Platform.OS === 'ios' ? '0px' : '7px'};
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
`;

const ForgotPasswordWrapper = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 10px;
`;

const SmallLink = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 14px;
  color: ${props => props.theme.primary};
`;

const RegisterLink = styled(SmallLink)`
  font-family: 'SofiaPro-Bold';
  font-size: 16px;
`;
