import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import { connect } from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import { useDarkMode } from 'react-native-dark-mode';

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
      this.props.startup();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <StatusBar barStyle="dark-content" />
        <ReduxNavigation />
      </Wrapper>
    </ThemeProvider>
  );
}

// wraps dispatch to create nicer functions to call within our component
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
