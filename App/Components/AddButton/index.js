import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'

import { Colors } from '../../Themes'

function AddButton ({ onPress }) {
  return (
    <Wrapper onPress={onPress}>
      <Icon name='plus' size={17} color={Colors.white} />
    </Wrapper>
  )
}

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default AddButton

const Wrapper = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 20px;
  background-color: ${Colors.blue};
  align-items: center;
  justify-content: center;
`
