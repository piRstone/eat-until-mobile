import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import moment from 'moment'

export function Product ({ data }) {
  const remainingDays = moment(data.expires_at, 'YYYY-MM-DD').diff(
    moment(),
    'd'
  )
  let dayClass
  if (remainingDays < 3) {
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
      <Days style={dayClass}>{remainingDays} j</Days>
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
  background-color: ${props => props.theme.whiteBackground};
  margin-bottom: 5px;
`

const Name = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.black};
`

const Date = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.grey1};
  margin-top: 5px;
`

const Days = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${props =>
    props.style === 'danger'
      ? props.theme.red
      : props.style === 'warning'
      ? props.theme.orange
      : props.theme.green};
`
