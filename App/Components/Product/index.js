import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import moment from 'moment'
import { Colors } from '../../Themes'

export function Product ({ data }) {
  const remainingDays = moment(data.expires_at, 'YYYY-MM-DD').diff(
    moment(),
    'd'
  )
  let dayClass
  if (remainingDays >= 0 && remainingDays < 3) {
    dayClass = 'danger'
  } else if (remainingDays > 2 && remainingDays < 5) {
    dayClass = 'warning'
  } else {
    dayClass = 'success'
  }
  return (
    <Wrapper>
      <View>
        <Name>{data.name}</Name>
        <Date>
          {moment(data.expires_at, 'YYYY-MM-DD').format('DD/MM/YYYY')}
        </Date>
      </View>
      <Days style={dayClass}>{remainingDays}d</Days>
    </Wrapper>
  )
}

Product.propTypes = {
  data: PropTypes.object.isRequired
}

export default Product

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 15px 10px;
  background-color: #fafafa;
  margin-bottom: 5px;
`

const Name = styled.Text`
  font-size: 18px;
`

const Date = styled.Text`
  font-size: 14px;
  color: ${Colors.grey1};
  margin-top: 5px;
`

const Days = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.style === 'danger' ? Colors.red : props.style === 'warning' ? Colors.orange : Colors.green};
`
