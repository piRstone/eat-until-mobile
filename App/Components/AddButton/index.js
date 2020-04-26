import React from 'react';
import { Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

function AddButton({ onPress, opened }) {
  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.timing(spinValue, {
    toValue: opened ? 1 : 0,
    duration: 250,
    easing: Easing.ease,
  }).start();

  // Second interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <Wrapper onPress={onPress}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <StyledIcon name="plus" size={17} />
      </Animated.View>
    </Wrapper>
  );
}

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  opened: PropTypes.bool,
};

export default AddButton;

const Wrapper = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 20px;
  background-color: ${props => props.theme.primary};
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.white};
`;
