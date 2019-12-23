import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import moment from 'moment'

import { Colors } from '../../Themes'

const ProductForm = ({ onSubmit }) => {
  const expireDaysInputRef = useRef(null)
  const notifyDaysInputRef = useRef(null)
  const [name, setName] = useState('')
  const [expireDays, setExpireDays] = useState('5')
  const [notifyDays, setNotifyDays] = useState('2')
  const [inputErrors, setInputErrors] = useState({})

  const handleSubmit = () => {
    if (name !== '' && expireDays !== '' && notifyDays !== '') {
      setInputErrors({})
      onSubmit({
        name,
        expiresAt: moment().add(parseInt(expireDays, 10) + 1, 'd').format('YYYY-MM-DD'),
        notifyBefore: notifyDays
      })
      setName('')
      setExpireDays('5')
      setNotifyDays('2')
    } else {
      let errors = {}
      if (name === '') {
        errors.name = true
      }
      if (expireDays === '') {
        errors.expireDays = true
      }
      if (notifyDays === '') {
        errors.notifyDays = true
      }
      setInputErrors(errors)
    }
  }

  return (
    <Wrapper>
      <Row>
        <Col>
          <Label>Nom du produit</Label>
          <Input
            onChangeText={e => setName(e)}
            placeholder='Tomates'
            autoFocus
            returnKeyType='next'
            value={name}
            invalid={inputErrors.name}
            onSubmitEditing={() => expireDaysInputRef.current.focus()}
          />
        </Col>
      </Row>
      <Row2>
        <Col>
          <Label>Se périme dans</Label>
          <Row>
            <NotifyDaysInput
              ref={expireDaysInputRef}
              onChangeText={e => setExpireDays(e)}
              keyboardType='number-pad'
              placeholder='5'
              returnKeyType='next'
              value={expireDays}
              invalid={inputErrors.expireDays}
              onSubmitEditing={() => notifyDaysInputRef.current.focus()}
            />
            <BigText>jours</BigText>
          </Row>
        </Col>
        <DayCol>
          <Label>Notification (jours)</Label>
          <Row>
            <BigText>J - </BigText>
            <DayInput
              ref={notifyDaysInputRef}
              onChangeText={e => setNotifyDays(e)}
              keyboardType='number-pad'
              placeholder='2'
              returnKeyType='done'
              value={notifyDays}
              invalid={inputErrors.notifyDays}
              onSubmitEditing={onSubmit}
            />
          </Row>
        </DayCol>
      </Row2>
      <ButtonWrapper>
        <AddButton onPress={handleSubmit}>
          <AddButtonText>Ajouter</AddButtonText>
        </AddButton>
      </ButtonWrapper>
    </Wrapper>
  )
}

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default ProductForm

const Wrapper = styled.View`
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 15px 10px;
  background-color: #fafafa;
  border-radius: 10px;
  margin-top: 20px;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Row2 = styled(Row)`
  margin-top: 10px;
`

const Col = styled.View`
  flex: 1;
  flex-direction: column;
`

const Label = styled.Text`
  font-size: 12px;
  color: ${Colors.black};
  margin-bottom: 5px;
`

const Input = styled.TextInput`
  height: 35px;
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.black};
  border-radius: 5px;
  background-color: ${Colors.white};
  padding: 5px 10px;
  border: ${props => props.invalid ? `1px solid ${Colors.red}` : `1px solid ${Colors.white}`};
  align-items: center;
`

const BigText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.black};
`

const DayCol = styled.View`
  flex-direction: column;
  margin-left: 10px;
`

const NotifyDaysInput = styled(Input)`
  width: 70px;
  margin-right: 10px;
  text-align: center;
`

const DayInput = styled(Input)`
  width: 100px;
`

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`

const AddButton = styled.TouchableOpacity`
  background-color: ${Colors.blue};
  border-radius: 20px;
  padding: 3px 10px;
`

const AddButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${Colors.white};
`
