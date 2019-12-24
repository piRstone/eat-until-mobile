import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'

import { Colors } from '../../Themes'

function ListForm ({ isLoading, onSubmit }) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    if (value !== '') {
      onSubmit(value)
      setValue('')
    }
  }

  return (
    <Wrapper>
      <Input
        onChangeText={e => setValue(e)}
        placeholder='Courses'
        autoFocus
        returnKeyType='done'
        value={value}
        onSubmitEditing={handleSubmit}
      />
      <SubmitButton onPress={handleSubmit}>
        {isLoading ? (
          <ActivityIndicator color={Colors.blue} />
        ) : (
          <Icon name='check' size={20} color={Colors.blue} />
        )}
      </SubmitButton>
    </Wrapper>
  )
}

ListForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default ListForm

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  padding: 15px 10px;
  background-color: ${Colors.lightgrey};
  margin-top: 20px;
`

const Input = styled.TextInput`
  flex: 1;
  height: 35px;
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.black};
  border-radius: 5px;
  background-color: ${Colors.white};
  padding: 5px 10px;
  align-items: center;
`

const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 5px;
  background-color: ${Colors.lightblue};
  margin-left: 10px;
`
