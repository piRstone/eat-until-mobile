import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Button = ({ title, onPress, isLoading, disabled }) => (
  <Wrapper onPress={onPress} disabled={disabled}>
    {isLoading ? <ActivityIndicator /> : <Text>{title}</Text>}
  </Wrapper>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;

const Wrapper = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${props =>
    props.disabled ? props.theme.grey2 : props.theme.primary};
  margin-top: 20px;
  padding-top: 7px;
`;

const Text = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 18px;
  color: ${props => props.theme.white};
`;
