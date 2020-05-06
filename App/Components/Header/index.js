import React from 'react';
import PropTypes from 'prop-types';
import { Platform, View } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

function Header({ onPress, title, titleSmaller, barStyle, right }) {
  return (
    <Wrapper>
      <LeftWrapper>
        <BackButton onPress={onPress}>
          <StyledBackIcon name="chevron-left" size={24} barStyle={barStyle} />
        </BackButton>
        {title && (
          <Title barStyle={barStyle} titleSmaller={titleSmaller}>
            {title}
          </Title>
        )}
      </LeftWrapper>
      <View>{right}</View>
    </Wrapper>
  );
}

Header.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  titleSmaller: PropTypes.bool,
  barStyle: PropTypes.oneOf(['light', 'dark']),
  right: PropTypes.element,
};

Header.defaultProps = {
  barStyle: 'dark',
};

export default Header;

const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  color: ${props =>
    props.barStyle === 'light' ? props.theme.white : props.theme.black};
`;

const Title = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: ${props => (props.titleSmaller ? '25px' : '30px')};
  color: ${props =>
    props.barStyle === 'light' ? props.theme.white : props.theme.black};
  padding-top: ${Platform.OS === 'ios' ? '17px' : 0};
`;

const LeftWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
