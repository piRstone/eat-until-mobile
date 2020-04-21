import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Keyboard, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { path } from 'ramda';
import Icon from 'react-native-vector-icons/Feather';

import UserActions from '../../Redux/UserRedux';
import TextInput from '../../Components/TextInput';

const illustration = require('../../Images/blob_and_key.png');

export function ForgotPasswordScreen({
  navigation,
  isLoading,
  resetPasswordState,
  submitRequest,
}) {
  const [userEmail, setUserEmail] = useState('');

  const text =
    'Saisissez votre adresse email pour recevoir les instructions pour réinitialiser votre mot de passe';
  const successText =
    'Un email a été envoyé à cette adresse si un compte y est associé.';
  const failureText =
    'Une erreur est survenue. Veuillez réessayer ultérieurement.';

  useEffect(() => {
    const email = path(['state', 'params', 'email'], navigation);
    if (email) {
      setUserEmail(email);
    }
  }, [navigation]);

  const onSubmit = () => {
    if (userEmail.length) {
      submitRequest(userEmail);
    }
  };

  return (
    <Wrapper>
      <ScrollView onScroll={() => Keyboard.dismiss()}>
        <InnerWrapper>
          <TitleWrapper>
            <StyledBackButton onPress={() => navigation.goBack()}>
              <StyledChevron name="chevron-left" size={35} />
            </StyledBackButton>
            <Title>Mot de passe oublié</Title>
          </TitleWrapper>
          <StyledIllu source={illustration} resizeMode="contain" />
          <Text>{text}</Text>
          <Form>
            <TextInput
              label="Email"
              onChangeText={setUserEmail}
              noBorderBottom
              inputProps={{
                value: userEmail,
                autoCorrect: false,
                autoCapitalize: 'none',
                keyboardType: 'email-address',
                placeholder: 'email@domaine.fr',
                autoFocus: true,
                returnKeyType: 'done',
                onSubmitEditing: onSubmit,
              }}
            />
          </Form>
          <StyledButton disabled={!userEmail} onPress={onSubmit}>
            {isLoading ? (
              <StyledActivityIndicator />
            ) : (
              <ButtonText>Réinitialiser</ButtonText>
            )}
          </StyledButton>
          {resetPasswordState !== undefined && (
            <StatusMessage isOk={resetPasswordState}>
              {resetPasswordState ? successText : failureText}
            </StatusMessage>
          )}
        </InnerWrapper>
      </ScrollView>
    </Wrapper>
  );
}

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.object,
  isLoading: PropTypes.bool,
  resetPasswordState: PropTypes.bool,
  submitRequest: PropTypes.func,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  resetPasswordState: state.user.resetPasswordState,
});

const mapDispatchToProps = dispatch => ({
  submitRequest: email => dispatch(UserActions.forgotPassword(email)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen);

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.View`
  align-items: center;
  margin: 20px;
`;

const TitleWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

const StyledBackButton = styled.TouchableOpacity`
  position: absolute;
  top: -7px;
  left: 0;
`;

const StyledChevron = styled(Icon)`
  color: ${props => props.theme.grey1};
`;

const StyledIllu = styled.Image`
  height: 200px;
  width: 100%;
  margin: 20px 0;
`;

const Title = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 25px;
  color: ${props => props.theme.black};
`;

const Text = styled.Text`
  font-family: 'SofiaProRegular';
  color: ${props => props.theme.black};
  margin-bottom: 10px;
  margin: 20px 0;
`;

const Form = styled.View`
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

const StyledActivityIndicator = styled.ActivityIndicator`
  color: ${props => props.theme.black};
`;

/* eslint-disable indent */
const StatusMessage = styled.Text`
  font-family: 'SofiaProRegular';
  margin-top: 20px;
  color: ${props =>
    props.isOk === true
      ? props.theme.green
      : props.isOk === false
      ? props.theme.red
      : props.theme.black};
`;
