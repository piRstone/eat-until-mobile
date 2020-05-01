import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, Platform } from 'react-native';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import AppNavigation from './AppNavigation';

export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'root',
);

const ReduxAppNavigator = createReduxContainer(AppNavigation, 'root');

function ReduxNavigation({ dispatch, nav }) {
  useEffect(() => {
    if (Platform.OS === 'ios') return;
    BackHandler.addEventListener('hardwareBackPress', () => {
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (
        nav.routes.length === 1 &&
        nav.routes[0].routeName === 'LaunchScreen'
      ) {
        return false;
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' });
      return true;
    });

    return () => {
      if (Platform.OS === 'ios') return;
      BackHandler.removeEventListener('hardwareBackPress', undefined);
    };
  }, []);

  return <ReduxAppNavigator dispatch={dispatch} state={nav} />;
}

ReduxNavigation.propTypes = {
  dispatch: PropTypes.func,
  nav: PropTypes.object,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(ReduxNavigation);
