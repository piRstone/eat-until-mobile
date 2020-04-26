import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import moment from 'moment';
import { withTranslation } from 'react-i18next';

const ProductForm = ({ t, onSubmit, onClose }) => {
  const expireDaysInputRef = useRef(null);
  const notifyDaysInputRef = useRef(null);
  const [name, setName] = useState('');
  const [expireDays, setExpireDays] = useState('5');
  const [notifyDays, setNotifyDays] = useState('2');
  const [inputErrors, setInputErrors] = useState({});

  const handleSubmit = () => {
    if (name !== '' && expireDays !== '' && notifyDays !== '') {
      setInputErrors({});
      onSubmit({
        name,
        expiresAt: moment()
          .add(parseInt(expireDays, 10) + 1, 'd')
          .format('YYYY-MM-DD'),
        notifyBefore: notifyDays,
      });
      setName('');
      setExpireDays('5');
      setNotifyDays('2');
    } else {
      let errors = {};
      if (name === '') {
        errors.name = true;
      }
      if (expireDays === '') {
        errors.expireDays = true;
      }
      if (notifyDays === '') {
        errors.notifyDays = true;
      }
      setInputErrors(errors);
    }
  };

  return (
    <Wrapper>
      <Row>
        <Col>
          <Label>{t('productForm:productName')}</Label>
          <Input
            onChangeText={e => setName(e)}
            placeholder={t('productForm:namePlaceholder')}
            autoFocus
            returnKeyType="next"
            value={name}
            invalid={inputErrors.name}
            onSubmitEditing={() => expireDaysInputRef.current.focus()}
          />
        </Col>
      </Row>
      <Row2>
        <Col>
          <Label>{t('productForm:endsIn')}</Label>
          <Row>
            <NotifyDaysInput
              ref={expireDaysInputRef}
              onChangeText={e => setExpireDays(e)}
              keyboardType="number-pad"
              placeholder="5"
              returnKeyType="next"
              value={expireDays}
              invalid={inputErrors.expireDays}
              onSubmitEditing={() => notifyDaysInputRef.current.focus()}
            />
            <BigText>{t('productForm:days')}</BigText>
          </Row>
        </Col>
        <DayCol>
          <Label>{t('productForm:notificationDays')}</Label>
          <Row>
            <BigText>{t('productForm:day')} - </BigText>
            <DayInput
              ref={notifyDaysInputRef}
              onChangeText={e => setNotifyDays(e)}
              keyboardType="number-pad"
              placeholder="2"
              returnKeyType="done"
              value={notifyDays}
              invalid={inputErrors.notifyDays}
              onSubmitEditing={onSubmit}
            />
          </Row>
        </DayCol>
      </Row2>
      <BottomRow>
        <ButtonWrapper>
          <AddButton onPress={handleSubmit}>
            <AddButtonText>{t('productForm:add')}</AddButtonText>
          </AddButton>
        </ButtonWrapper>
        <CloseButton onPress={onClose}>{t('productForm:close')}</CloseButton>
      </BottomRow>
    </Wrapper>
  );
};

ProductForm.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withTranslation()(ProductForm);

const Wrapper = styled.View`
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 15px 10px;
  background-color: ${props => props.theme.whiteBackground};
  border-radius: 10px;
  margin-top: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Row2 = styled(Row)`
  margin-top: 10px;
`;

const Col = styled.View`
  flex: 1;
  flex-direction: column;
`;

const Label = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 12px;
  color: ${props => props.theme.black};
  margin-bottom: 5px;
`;

const Input = styled.TextInput`
  font-family: 'SofiaProRegular';
  height: 35px;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.black};
  border-radius: 5px;
  background-color: ${props => props.theme.white};
  padding: 0;
  border: ${props =>
    props.invalid
      ? `1px solid ${props.theme.red}`
      : `1px solid ${props.theme.white}`};
  align-items: center;
  line-height: 16px;
`;

const BigText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.black};
`;

const DayCol = styled.View`
  flex-direction: column;
  margin-left: 10px;
`;

const NotifyDaysInput = styled(Input)`
  font-family: 'SofiaProRegular';
  width: 40px;
  padding-right: 5px;
  text-align: right;
`;

const DayInput = styled(Input)`
  font-family: 'SofiaProRegular';
  width: 100px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;

const BottomRow = styled(Row)`
  justify-content: center;
`;

const AddButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.primary};
  border-radius: 20px;
  padding: 5px 10px 0px 10px;
`;

const AddButtonText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.white};
`;

const CloseButton = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 16px;
  color: ${props => props.theme.grey1};
  margin-top: 16px;
  margin-left: 10px;
`;
