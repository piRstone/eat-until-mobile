import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Keyboard, ScrollView } from 'react-native';
import { compose } from 'redux';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Feather';

import Checkbox from '../../Components/Checkbox';
import UserActions from '../../Redux/UserRedux';
import TextInput from '../../Components/TextInput';

export function RegisterScreen({ t, navigation, register, isLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptEULA, setAcceptEULA] = useState(false);
  const passwordRef = useRef();

  return (
    <Wrapper>
      <InnerWrapper>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <StyledBackIcon name="chevron-left" size={24} />
          </BackButton>
          <Title>{t('register:signUp')}</Title>
        </Header>
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always">
          <TextInput
            label="Email"
            onChangeText={setEmail}
            inputProps={{
              value: email,
              autoCorrect: false,
              autoCapitalize: 'none',
              keyboardType: 'email-address',
              placeholder: t('register:emailPlaceholder'),
              autoFocus: true,
              returnKeyType: 'next',
              onSubmitEditing: () => passwordRef.current.focus(),
            }}
          />
          <SmallText>{t('register:emailExplanation')}</SmallText>
          <TextInput
            label={t('register:password')}
            onChangeText={setPassword}
            noBorderBottom
            inputProps={{
              ref: passwordRef,
              value: password,
              secureTextEntry: true,
              placeholder: '********',
              returnKeyType: 'done',
              onSubmitEditing: () => Keyboard.dismiss(),
            }}
          />
          <EULAWrapper>
            <Checkbox
              checked={acceptEULA}
              onChange={() => setAcceptEULA(!acceptEULA)}
            />
            <EULAText>
              <EULAText>{t('register:EULASentence')}</EULAText>
              <EULALink onPress={() => navigation.navigate('EULAScreen')}>
                {t('register:EULA')}
              </EULALink>
              .
            </EULAText>
          </EULAWrapper>
          <StyledButton
            onPress={() => {
              register(email, password);
              Keyboard.dismiss();
            }}
            disabled={!email || !password || !acceptEULA}>
            {isLoading ? (
              <StyledActivityIndicator />
            ) : (
              <ButtonText>{t('register:registration')}</ButtonText>
            )}
          </StyledButton>
          <SmallText>{t('register:privacySentence')}</SmallText>
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
  register: (email, password) =>
    dispatch(UserActions.register(email, password)),
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

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const StyledBackIcon = styled(Icon)`
  color: ${props => props.theme.black};
`;

const Title = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 30px;
  color: ${props => props.theme.black};
  padding-top: 17px;
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

const StyledButton = styled.TouchableOpacity`
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${props =>
    props.disabled ? props.theme.grey2 : props.theme.primary};
  margin-top: 20px;
  margin-bottom: 30px;
  padding-top: 7px;
`;

const ButtonText = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 18px;
  color: ${props => props.theme.white};
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  color: ${props => props.theme.white};
`;
