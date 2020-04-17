import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Button = ({ title, onPress }) => (
  <StyledButton title={title} onPress={onPress} />
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;

const StyledButton = styled.Button`
  color: #445764;
`;
