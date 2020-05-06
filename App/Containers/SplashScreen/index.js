import React from 'react';
import styled from 'styled-components/native';

export default function SplashScreen() {
  return <Wrapper />;
}

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;
