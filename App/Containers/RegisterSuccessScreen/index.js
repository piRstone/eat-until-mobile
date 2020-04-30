import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';

import { Metrics } from '../../Themes';

export function RegisterSuccessScreen({ t, navigation }) {
  return (
    <Wrapper>
      <InnerWrapper>
        <Emoji>🎉</Emoji>
        <Title>{t('registerSuccess:title')}</Title>
        <Text>{t('registerSuccess:success')}</Text>
        <StyledButton onPress={() => navigation.navigate('LoginScreen')}>
          <ButtonText>{t('registerSuccess:login')}</ButtonText>
        </StyledButton>
      </InnerWrapper>
    </Wrapper>
  );
}

RegisterSuccessScreen.propTypes = {
  t: PropTypes.func,
  navigation: PropTypes.object,
};

export default withTranslation()(RegisterSuccessScreen);

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

const Title = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 24px;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 16px;
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
