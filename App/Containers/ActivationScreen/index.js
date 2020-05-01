import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { Metrics } from '../../Themes';
import UserActions from '../../Redux/UserRedux';

export function ActivationScreen({
  t,
  navigation,
  isLoading,
  activationState,
  activate,
}) {
  // Get token from url
  useEffect(() => {
    console.tron.warn(navigation);
  }, []);

  return (
    <Wrapper>
      <InnerWrapper>
        {(isLoading || activationState === undefined) && (
          <LoadingMessage>{t('activation:loadingMessage')}</LoadingMessage>
        )}
        {!isLoading && activationState === true && (
          <React.Fragment>
            <Emoji>👍</Emoji>
            <Title>{t('activation:title')}</Title>
            <Text>{t('activation:text')}</Text>
            <StyledButton onPress={() => navigation.navigate('LoginScreen')}>
              <ButtonText>{t('activation:login')}</ButtonText>
            </StyledButton>
          </React.Fragment>
        )}
        {!isLoading && activationState === false && (
          <React.Fragment>
            <Emoji>😖</Emoji>
            <Title>{t('activation:errorTitle')}</Title>
            <Text>{t('activation:errorText')}</Text>
            <StyledButton onPress={() => navigation.navigate('LoginScreen')}>
              <ButtonText>{t('activation:generate')}</ButtonText>
            </StyledButton>
          </React.Fragment>
        )}
      </InnerWrapper>
    </Wrapper>
  );
}

ActivationScreen.propTypes = {
  t: PropTypes.func,
  navigation: PropTypes.object,
  isLoading: PropTypes.bool,
  activationState: PropTypes.bool,
  activate: PropTypes.func,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  activationState: state.user.activationState,
});

const mapDispatchToProps = dispatch => ({
  activate: (uidb64, token) => dispatch(UserActions.activate(token, uidb64)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withTranslation(),
)(ActivationScreen);

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.View`
  align-items: center;
`;

const Emoji = styled.Text`
  font-size: 60px;
  margin: 30px 0;
`;

const LoadingMessage = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 14px;
  color: ${props => props.theme.grey1};
`;

const Title = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 24px;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
`;

const StyledButton = styled.TouchableOpacity`
  height: 40px;
  width: ${Metrics.screenWidth - 40};
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
