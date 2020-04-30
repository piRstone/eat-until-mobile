import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Checkbox({ checked, label, onChange }) {
  return (
    <Wrapper>
      <Box onPress={() => onChange(!checked)}>
        {checked && <StyledIcon name="check" size={15} />}
      </Box>
      {label && <StyledText>{label}</StyledText>}
    </Wrapper>
  );
}

Checkbox.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  checked: PropTypes.bool,
};

Checkbox.defaultProps = {
  checked: false,
};

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Box = styled.TouchableOpacity`
  height: 20px;
  width: 20px;
  border: 1px solid ${props => props.theme.grey0};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.green};
`;

const StyledText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 14px;
  margin-left: 10px;
  color: ${props => props.theme.black};
`;
