import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';

import UserActions from '../../Redux/UserRedux';
import Header from '../../Components/Header';

export function ProfileScreen({ t, navigation, logout, user }) {
  return (
    <Wrapper>
      <InnerWrapper>
        <Header
          title={t('profile:profile')}
          onPress={() => navigation.goBack()}
        />
        <StyledText>{user.email}</StyledText>
        <LogoutWrapper onPress={logout}>
          <LogoutText>{t('profile:logout')}</LogoutText>
        </LogoutWrapper>
        <StyledLink>
          {t('profile:sendComments')} : eatuntil@pirstone.com
        </StyledLink>
        <SecondaryText>© piRstone {new Date().getFullYear()}</SecondaryText>
        <SecondaryText>Eat Until v{DeviceInfo.getVersion()}</SecondaryText>
      </InnerWrapper>
    </Wrapper>
  );
}

ProfileScreen.propTypes = {
  t: PropTypes.func,
  navigation: PropTypes.object,
  logout: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserActions.logout()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withTranslation(),
)(ProfileScreen);

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;

const StyledText = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 20px;
  color: ${props => props.theme.black};
`;

const LogoutWrapper = styled.TouchableOpacity`
  margin: 20px 0 80px;
`;

const LogoutText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 16px;
  color: ${props => props.theme.red};
`;

const StyledLink = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 16px;
  color: ${props => props.theme.black};
  margin-bottom: 20px;
`;

const SecondaryText = styled.Text`
  font-family: 'SofiaProRegular';
  color: ${props => props.theme.grey1};
`;
