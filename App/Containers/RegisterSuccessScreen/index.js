import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { withTranslation } from 'react-i18next';

import { Metrics } from '../../Themes';
import Button from '../../Components/Button';

export function RegisterSuccessScreen({ t, navigation }) {
  return (
    <Wrapper>
      <InnerWrapper>
        <Emoji>🎉</Emoji>
        <Title>{t('registerSuccess:title')}</Title>
        <TextWrapper>
          <Text>{t('registerSuccess:success')}</Text>
          <TextSecondary>{t('registerSuccess:checkSpam')}</TextSecondary>
        </TextWrapper>
        <View style={{ width: Metrics.screenWidth - 40 }}>
          <Button
            onPress={() => navigation.navigate('LoginScreen')}
            title={t('registerSuccess:login')}
          />
        </View>
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
  margin-bottom: 30px;
`;

const Title = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 24px;
  margin-bottom: 20px;
  color: ${props => props.theme.black};
`;

const TextWrapper = styled.View`
  margin: 0 20px 40px;
`;

const Text = styled.Text`
  font-family: 'SofiaProRegular';
  color: ${props => props.theme.black};
  font-size: 16px;
`;

const TextSecondary = styled(Text)`
  margin-bottom: 30px;
  color: ${props => props.theme.grey1};
`;
