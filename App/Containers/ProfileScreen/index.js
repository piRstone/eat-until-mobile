import React from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Feather';

import UserActions from '../../Redux/UserRedux';

export function ProfileScreen({ t, navigation, logout, user }) {
  return (
    <Wrapper>
      <InnerWrapper>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <StyledBackIcon name="chevron-left" size={24} />
          </BackButton>
          <Title>{t('profile:profile')}</Title>
        </Header>
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
