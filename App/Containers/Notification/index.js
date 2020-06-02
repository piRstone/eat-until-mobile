import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Platform, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Metrics } from '../../Themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import DeviceInfo from 'react-native-device-info';

const TRANSITION_HEIGHT = DeviceInfo.hasNotch() ? 150 : 130;

export const types = {
  success: 0,
  danger: 1,
};

export function Notification({ text, type, id, persist }) {
  const animationRef = useRef();
  let timeout = useRef();

  useEffect(() => {
    if (id) {
      animationRef.current.transitionTo({ translateY: TRANSITION_HEIGHT });
    }

    if (!persist) {
      timeout.current = setTimeout(() => {
        dismiss();
      }, 3000);
    }

    return () => clearTimeout(timeout.current);
  }, [id, persist]);

  const dismiss = () => {
    animationRef.current.transitionTo({ translateY: 0 });
    clearTimeout(timeout.current);
  };

  let LeftBarComponent = LeftBar;
  let icon = '';
  switch (type) {
    default:
    case types.success:
      LeftBarComponent = LeftBarSuccess;
      icon = 'check-circle';
      break;
    case types.danger:
      LeftBarComponent = LeftBarDanger;
      icon = 'exclamation-circle';
      break;
  }
  return (
    <StyledAnimated ref={animationRef}>
      <TouchableWithoutFeedback onPress={dismiss}>
        <Wrapper>
          <LeftBarComponent />
          <Icon name={icon} size={25} color="#000000" />
          <StyledText numberOfLines={2}>{text}</StyledText>
        </Wrapper>
      </TouchableWithoutFeedback>
    </StyledAnimated>
  );
}

const mapStateToProps = state => ({
  text: state.notification.text,
  type: state.notification.type,
  id: state.notification.id,
});

export default connect(mapStateToProps)(Notification);

Notification.propTypes = {
  text: PropTypes.string,
  type: PropTypes.number,
  id: PropTypes.number,
  persist: PropTypes.bool,
};

Notification.defaultProps = {
  persist: false,
};

const StyledAnimated = styled(Animatable.View)`
  position: absolute;
  top: -100px;
  left: 0;
`;

const Wrapper = styled.View`
  width: ${Metrics.screenWidth - 20};
  height: 70px;
  margin: 0 10px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.whiteBackground};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  elevation: 8;
`;

const LeftBar = styled.View`
  margin-right: 20px;
  height: 100%;
  width: 5px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const LeftBarSuccess = styled(LeftBar)`
  background-color: ${props => props.theme.green};
`;

const LeftBarDanger = styled(LeftBar)`
  background-color: ${props => props.theme.red};
`;

const StyledText = styled.Text`
  font-family: 'SofiaPro-Bold';
  color: ${props => props.theme.black};
  font-size: 16px;
  padding-top: ${Platform.OS === 'ios' ? '7px' : '0'};
  margin-left: 15px;
  margin-right: 70px;
`;
