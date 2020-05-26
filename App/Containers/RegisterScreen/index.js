import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Keyboard, ScrollView } from 'react-native';
import { compose } from 'redux';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';

import Header from '../../Components/Header';
import Button from '../../Components/Button';
import Checkbox from '../../Components/Checkbox';
import UserActions from '../../Redux/UserRedux';
import TextInput from '../../Components/TextInput';

export function RegisterScreen({ t, navigation, register, isLoading }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptEULA, setAcceptEULA] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

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

  return (
    <Wrapper>
      <InnerWrapper>
        <Header
          title={t('register:signUp')}
          onPress={() => navigation.navigate('LoginScreen')}
        />
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always">
          <FieldWrapper>
            <TextInput
              label={t('register:firstName')}
              onChangeText={setFirstname}
              inputProps={{
                value: firstname,
                placeholder: t('register:firstNamePlaceholder'),
                autoFocus: true,
                returnKeyType: 'next',
                onSubmitEditing: () => lastnameRef.current.focus(),
              }}
            />
            <TextInput
              label={t('register:lastName')}
              onChangeText={setLastname}
              inputProps={{
                ref: lastnameRef,
                value: lastname,
                placeholder: t('register:lastNamePlaceholder'),
                returnKeyType: 'next',
                onSubmitEditing: () => emailRef.current.focus(),
              }}
            />
            <TextInput
              label="Email"
              onChangeText={setEmail}
              noBorderBottom
              required
              invalid={invalidEmail}
              errorMessage={t('register:invalidEmail')}
              inputProps={{
                ref: emailRef,
                value: email,
                autoCapitalize: 'none',
                keyboardType: 'email-address',
                placeholder: t('register:emailPlaceholder'),
                returnKeyType: 'next',
                onSubmitEditing: () => passwordRef.current.focus(),
                onBlur: checkEmail,
                onFocus: () => invalidEmail && setInvalidEmail(false),
              }}
            />
          </FieldWrapper>
          <SmallText>{t('register:emailExplanation')}</SmallText>
          <FieldWrapper>
            <TextInput
              label={t('register:password')}
              onChangeText={setPassword}
              noBorderBottom
              required
              inputProps={{
                ref: passwordRef,
                value: password,
                secureTextEntry: true,
                placeholder: '********',
                returnKeyType: 'done',
                onSubmitEditing: () => Keyboard.dismiss(),
              }}
            />
          </FieldWrapper>
          <EULAWrapper>
            <Checkbox
              checked={acceptEULA}
              onChange={() => setAcceptEULA(!acceptEULA)}
            />
            <EULAText>
              <EULAText>{t('register:EULASentence')}</EULAText>
              <EULALink onPress={() => navigation.navigate('AuthEULAScreen')}>
                {t('register:EULA')}
              </EULALink>
              .
            </EULAText>
          </EULAWrapper>
          <Button
            onPress={() => {
              register(firstname, lastname, email, password);
              Keyboard.dismiss();
            }}
            disabled={!email || !password || !acceptEULA || invalidEmail}
            title={t('register:registration')}
            isLoading={isLoading}
          />
          <BottomSmallText>{t('register:privacySentence')}</BottomSmallText>
        </ScrollView>
      </InnerWrapper>
    </Wrapper>
  );
}

RegisterScreen.propTypes = {
  t: PropTypes.func,
  navigation: PropTypes.object,
  register: PropTypes.func,
  isLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = dispatch => ({
  register: (firstname, lastname, email, password) =>
    dispatch(UserActions.register(firstname, lastname, email, password)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withTranslation(),
)(RegisterScreen);

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;

const FieldWrapper = styled.View`
  border-radius: 10px;
  overflow: hidden;
`;

const EULAWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const EULAText = styled.Text`
  font-family: 'SofiaProRegular';
  color: ${props => props.theme.grey1};
  font-size: 16px;
  margin-left: 10px;
`;

const EULALink = styled(EULAText)`
  color: ${props => props.theme.green};
`;

const SmallText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 12px;
  margin: 5px 0;
  margin-bottom: 20px;
  color: ${props => props.theme.grey1};
`;

const BottomSmallText = styled(SmallText)`
  margin-top: 30px;
`;
