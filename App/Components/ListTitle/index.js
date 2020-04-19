import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const ListTitle = ({ title, onSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(title);
  }, [title]);

  return (
    <React.Fragment>
      {showForm ? (
        <Input
          onChangeText={e => setValue(e)}
          placeholder="Ma liste"
          autoFocus
          returnKeyType="done"
          value={value}
          onSubmitEditing={() => {
            onSubmit(value);
            setShowForm(false);
          }}
        />
      ) : (
        <Title onPress={() => setShowForm(true)}>{title}</Title>
      )}
    </React.Fragment>
  );
};

ListTitle.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default ListTitle;

const Title = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 16px;
  font-weight: 600;
  margin: 5px 0;
`;

const Input = styled.TextInput`
  height: 25px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid ${props => props.theme.grey2};
  border-radius: 4px;
  padding: 2px 5px;
`;
