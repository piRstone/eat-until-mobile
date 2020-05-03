import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { path } from 'ramda';
import { withTranslation } from 'react-i18next';

import UserActions from '../../Redux/UserRedux';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import TextInput from '../../Components/TextInput';

const illustration = require('../../Images/blob_and_key.png');

export function ForgotPasswordScreen({
  t,
  navigation,
  isLoading,
  resetPasswordState,
  submitRequest,
}) {
  const [userEmail, setUserEmail] = useState('');

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
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always">
        <InnerWrapper>
          <Header
            title={t('forgotPassword:title')}
            onPress={() => navigation.goBack()}
            titleSmaller
          />
          {/* <TitleWrapper>
            <StyledBackButton onPress={() => navigation.goBack()}>
              <StyledChevron name="chevron-left" size={35} />
            </StyledBackButton>
            <Title>{t('forgotPassword:title')}</Title>
          </TitleWrapper> */}
          <StyledIllu source={illustration} resizeMode="contain" />
          <Text>{t('forgotPassword:explanationText')}</Text>
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
                placeholder: t('forgotPassword:emailPlaceholder'),
                autoFocus: true,
                returnKeyType: 'done',
                onSubmitEditing: onSubmit,
              }}
            />
          </Form>
          <Button
            disabled={!userEmail}
            onPress={onSubmit}
            title={t('forgotPassword:reset')}
            isLoading={isLoading}
          />
          {resetPasswordState !== undefined && (
            <StatusMessage isOk={resetPasswordState}>
              {resetPasswordState
                ? t('forgotPassword:successText')
                : t('forgotPassword:failureText')}
            </StatusMessage>
          )}
        </InnerWrapper>
      </ScrollView>
    </Wrapper>
  );
}

ForgotPasswordScreen.propTypes = {
  t: PropTypes.func,
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withTranslation(),
)(ForgotPasswordScreen);

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.View`
  align-items: center;
  margin: 20px;
  margin-top: 0;
`;

const StyledIllu = styled.Image`
  height: 200px;
  width: 100%;
  margin: 20px 0;
`;

const Text = styled.Text`
  font-family: 'SofiaProRegular';
  color: ${props => props.theme.black};
  margin-bottom: 10px;
  margin: 20px 0;
  text-align: center;
`;

const Form = styled.View`
  width: 100%;
  flex-direction: column;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
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
