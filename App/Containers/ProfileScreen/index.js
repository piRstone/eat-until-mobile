import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform, View } from 'react-native';
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
          right={
            <EditButton
              onPress={() =>
                navigation.navigate('ProfileFormScreen', { user })
              }>
              {t('profile:edit')}
            </EditButton>
          }
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View>
            <StyledName>
              {user.firstName} {user.lastName}
            </StyledName>
            <StyledEmail>{user.email}</StyledEmail>
            <LogoutWrapper onPress={logout}>
              <LogoutText>{t('profile:logout')}</LogoutText>
            </LogoutWrapper>
          </View>
          <View>
            <StyledText>
              {t('profile:sendComments')} : eatuntil@pirstone.com
            </StyledText>
            <EULAWrapper onPress={() => navigation.navigate('EULAScreen')}>
              <StyledLink>
                Conditions générales d'utilisation et politique de
                confidentialité
              </StyledLink>
            </EULAWrapper>
            <SecondaryText>© piRstone {new Date().getFullYear()}</SecondaryText>
            <SecondaryText>Eat Until v{DeviceInfo.getVersion()}</SecondaryText>
          </View>
        </View>
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

const StyledName = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 25px;
  color: ${props => props.theme.black};
`;

const StyledEmail = styled(StyledName)`
  font-family: 'SofiaProRegular';
  font-size: 18px;
`;

const StyledText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 16px;
  color: ${props => props.theme.black};
`;

const LogoutWrapper = styled.TouchableOpacity`
  margin: 20px 0 80px;
`;

const LogoutText = styled(StyledText)`
  color: ${props => props.theme.red};
`;

const EULAWrapper = styled.TouchableOpacity`
  margin: 20px 0;
`;

const StyledLink = styled(StyledText)`
  color: ${props => props.theme.primary};
`;

const SecondaryText = styled.Text`
  font-family: 'SofiaProRegular';
  color: ${props => props.theme.grey1};
`;

const EditButton = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 18px;
  color: ${props => props.theme.primary};
  margin-top: ${Platform.OS === 'ios' ? '5px' : '0'};
`;
