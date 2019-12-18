import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Colors } from '../../Themes'

function ListForm ({ onSubmit }) {
  const [value, setValue] = useState('')

  return (
    <Wrapper>
      <Input onChangeText={e => setValue(e)} placeholder='Tomates' />
      <SubmitButton onPress={() => onSubmit(value)} />
    </Wrapper>
  )
}

ListForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default ListForm

const Wrapper = styled.View`
  flex-direction: row;
  border-radius: 10px;
  padding: 15px 10px;
  background-color: #fafafa;
`

const Input = styled.TextInput`
  height: 35px;
  width: 50%;
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.black};
  border-radius: 5px;
  background-color: ${Colors.white};
  padding: 10px;
`

const SubmitButton = styled.TouchableOpacity`
  height: 35px;
  width: 35px;
  border-radius: 5px;
  background-color: ${Colors.blue};
  margin-left: 10px;
`
