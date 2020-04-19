import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

function ListForm({ isLoading, onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value !== '') {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <Wrapper>
      <Input
        onChangeText={e => setValue(e)}
        placeholder="Courses"
        autoFocus
        returnKeyType="done"
        value={value}
        onSubmitEditing={handleSubmit}
      />
      <SubmitButton onPress={handleSubmit}>
        {isLoading ? (
          <StyledActivityIndicator />
        ) : (
          <StyledIcon name="check" size={20} />
        )}
      </SubmitButton>
    </Wrapper>
  );
}

ListForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ListForm;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  padding: 15px 10px;
  background-color: ${props => props.theme.whiteBackground};
  margin-bottom: 20px;
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  color: ${props => props.theme.blue};
`;

const Input = styled.TextInput`
  flex: 1;
  font-family: 'SofiaProRegular';
  height: 35px;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.black};
  border-radius: 5px;
  background-color: ${props => props.theme.backgroundColor};
  padding: 5px 10px;
  align-items: center;
`;

const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 5px;
  background-color: ${props => props.theme.lightblue};
  margin-left: 10px;
`;

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.blue};
`;
