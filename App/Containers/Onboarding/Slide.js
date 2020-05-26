import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { Metrics } from '../../Themes';

function Slide({ title, text, illu, component }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Text>{text}</Text>
      <Illu source={illu} resizeMode="contain" />
      <ComponentWrapper>{component}</ComponentWrapper>
    </Wrapper>
  );
}

Slide.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  illu: PropTypes.element.isRequired,
  component: PropTypes.element.isRequired,
};

export default Slide;

const Wrapper = styled.View`
  width: ${Metrics.screenWidth};
  align-items: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 28px;
  color: ${props => props.theme.primary};
  text-align: center;
`;

const Text = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 18px;
  color: ${props => props.theme.black};
  margin-top: 40px;
`;

const Illu = styled.Image`
  width: ${Metrics.screenWidth - 40};
  height: 200px;
  margin: 40px auto 40px;
`;

const ComponentWrapper = styled.View`
  width: 100%;
`;
