import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import {
  SplashScreenStack,
  OnboardingStack,
  AuthenticationStack,
  MainStack,
} from '../Navigation/AppNavigation';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import { useDarkMode } from 'react-native-dark-mode';

import Notification from './Notification';
import { Colors } from '../Themes';

function RootContainer({ hasEverLaunchedApp, token, startup }) {
  const isDarkMode = useDarkMode();

  const themeColors = Colors(isDarkMode);
  const theme = {
    ...themeColors,
    fontFamily: 'SofiaProRegular',
  };

  useEffect(() => {
    console.tron.warn(`hasEverLaunchedApp: ${hasEverLaunchedApp}`);
    console.tron.warn(`token: ${token}`);
  }, [hasEverLaunchedApp, token]);

  useEffect(() => {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      startup();
    }
  }, [startup]);

  const getNavigation = () => {
    if (hasEverLaunchedApp === undefined) {
      return <SplashScreenStack />;
    }

    if (hasEverLaunchedApp === false) {
      return <OnboardingStack />;
    }

    if (!token) {
      return <AuthenticationStack />;
    }

    return <MainStack />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>{getNavigation()}</NavigationContainer>
        <Notification />
      </Wrapper>
    </ThemeProvider>
  );
}

RootContainer.propTypes = {
  hasEverLaunchedApp: PropTypes.bool,
  token: PropTypes.string,
  startup: PropTypes.func,
};

const mapStateToProps = state => ({
  hasEverLaunchedApp: state.user.hasEverLaunchedApp,
  token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);

const Wrapper = styled.View`
  flex: 1;
`;
