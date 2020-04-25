import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import { connect } from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import { useDarkMode } from 'react-native-dark-mode';

import Notification from './Notification';
import { Colors } from '../Themes';

function RootContainer({ startup }) {
  const isDarkMode = useDarkMode();

  const themeColors = Colors(isDarkMode);
  const theme = {
    ...themeColors,
    fontFamily: 'SofiaProRegular',
  };

  useEffect(() => {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      startup();
    }
  }, [startup]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <StatusBar barStyle="dark-content" />
        <ReduxNavigation />
        <Notification />
      </Wrapper>
    </ThemeProvider>
  );
}

RootContainer.propTypes = {
  startup: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(
  null,
  mapDispatchToProps,
)(RootContainer);

const Wrapper = styled.View`
  flex: 1;
`;
