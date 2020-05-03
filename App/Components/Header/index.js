import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

function Header({ onPress, title, titleSmaller }) {
  return (
    <Wrapper>
      <BackButton onPress={onPress}>
        <StyledBackIcon name="chevron-left" size={24} />
      </BackButton>
      {title && <Title titleSmaller={titleSmaller}>{title}</Title>}
    </Wrapper>
  );
}

Header.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  titleSmaller: PropTypes.bool,
};

export default Header;

const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const StyledBackIcon = styled(Icon)`
  color: ${props => props.theme.black};
`;

const Title = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: ${props => (props.titleSmaller ? '25px' : '30px')};
  color: ${props => props.theme.black};
  padding-top: 17px;
`;
