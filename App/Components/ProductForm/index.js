import React, { useState, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

import { Colors } from '../../Themes'

const ProductForm = ({ onSubmit }) => {
  const dateInputRef = useRef(null)
  const dayInputRef = useRef(null)
  const [name, setName] = useState('')
  const [date, setDate] = useState(moment().format('DD/MM/YYYY'))
  const [day, setDay] = useState('2')

  const handleSubmit = () => {
    if (name !== '' && date !== '' && day !== '') {
      onSubmit({
        name,
        expiresAt: date,
        notifyBefore: day
      })
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
            onSubmitEditing={() => dateInputRef.current.focus()}
          />
        </Col>
      </Row>
      <Row2>
        <Col>
          <Label>Se périme le</Label>
          <DatePicker
            date={date}
            mode='date'
            placeholder='00/00/0000'
            format='DD/MM/YYYY'
            minDate={moment().format('DD/MM/YYYY')}
            confirmBtnText='OK'
            cancelBtnText='Annuler'
            onDateChange={date => setDate(date)}
            showIcon={false}
            customStyles={{
              placeholderText: {
                fontSize: 18,
                fontWeight: 'bold'
              },
              dateText: {
                fontSize: 18,
                fontWeight: 'bold'
              },
              dateTouchBody: {
                width: '100%',
                padding: 10,
                height: 35,
                backgroundColor: Colors.white,
                borderRadius: 5
              },
              dateInput: {
                width: '100%',
                borderWidth: 0,
                padding: 0,
                margin: 0
              },
              btnTextCancel: {
                color: Colors.blue
              },
              btnTextConfirm: {
                fontWeight: 'bold',
                color: Colors.blue
              },
              disabled: {
                backgroundColor: 'transparent'
              }
            }}
          />
        </Col>
        <DayCol>
          <Label>Notification (jours)</Label>
          <DayInput
            ref={dayInputRef}
            onChangeText={e => setDay(e)}
            keyboardType='number-pad'
            placeholder='J-2'
            returnKeyType='done'
            value={day}
            onSubmitEditing={onSubmit}
          />
        </DayCol>
      </Row2>
      <ButtonWrapper>
        <TouchableOpacity onPress={handleSubmit}>
          <AddButton>Ajouter</AddButton>
        </TouchableOpacity>
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
  padding: 10px;
`

const DayCol = styled.View`
  flex-direction: column;
  margin-left: 10px;
`

const DayInput = styled(Input)`
  width: 150px;
`

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`

const AddButton = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.blue};
`
