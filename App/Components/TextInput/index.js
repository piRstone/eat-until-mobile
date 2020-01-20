import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

function TextInput ({ label, onChangeText, inputProps }) {
  return (
    <Wrapper>
      <Label>{ label }</Label>
      <StyledInput onChangeText={onChangeText} {...inputProps} />
    </Wrapper>
  )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  inputProps: PropTypes.object
}

export default TextInput

const Wrapper = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.grey2};
  background-color: ${props => props.theme.whiteBackground};
`

const Label = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.grey1};
  margin: 0;
  margin-bottom: 5px;
`

const StyledInput = styled.TextInput`
  font-size: 20px;
  color: ${props => props.theme.black};
`
