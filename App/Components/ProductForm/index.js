import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import { path } from 'ramda';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withTranslation } from 'react-i18next';

const ProductForm = ({ t, onSubmit, navigation }) => {
  const expireDaysInputRef = useRef(null);
  const notifyDaysInputRef = useRef(null);
  const [name, setName] = useState('');
  const [expireDays, setExpireDays] = useState('5');
  const [notifyDays, setNotifyDays] = useState('2');
  const [inputErrors, setInputErrors] = useState({});
  const [ean13, setEan13] = useState(undefined);

  // Handle OpenFoodFacts product data
  useEffect(() => {
    const product = path(['state', 'params', 'OFFProduct'], navigation);
    if (product) {
      const { product_name, id } = product;
      setName(product_name);
      setEan13(id);
    }
  }, [navigation]);

  const handleSubmit = () => {
    if (name !== '' && expireDays !== '' && notifyDays !== '') {
      setInputErrors({});
      onSubmit({
        name,
        expiresAt: moment()
          .add(parseInt(expireDays, 10) + 1, 'd')
          .format('YYYY-MM-DD'),
        notifyBefore: notifyDays,
        ean13,
      });
      clearForm();
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

  const clearForm = useCallback(() => {
    setName('');
    setExpireDays('5');
    setNotifyDays('2');
    setEan13(undefined);
    navigation.setParams({ OFFProduct: undefined });
  }, [navigation]);

  return (
    <Wrapper>
      <HeadRow>
        <HeadLeftCol>
          <Label>{t('productForm:productName')}</Label>
          <NameInput
            onChangeText={e => setName(e)}
            placeholder={t('productForm:namePlaceholder')}
            autoFocus
            returnKeyType="next"
            value={name}
            invalid={inputErrors.name}
            onSubmitEditing={() => expireDaysInputRef.current.focus()}
          />
        </HeadLeftCol>
        <HeadRightCol>
          {ean13 && (
            <Row>
              <SmallEan13>{ean13}</SmallEan13>
              <StyledBarcode name="barcode" size={14} />
            </Row>
          )}
          <StyledCameraLink onPress={() => navigation.navigate('CameraScreen')}>
            <StyledCamera name="camera" size={18} />
            <SmallScanText>SCAN</SmallScanText>
          </StyledCameraLink>
        </HeadRightCol>
      </HeadRow>
      <Row2>
        <DateCol onPress={() => expireDaysInputRef.current.focus()}>
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
              selectTextOnFocus
            />
            <BigText>{t('productForm:days')}</BigText>
          </Row>
        </DateCol>
        <DayCol onPress={() => notifyDaysInputRef.current.focus()}>
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
              selectTextOnFocus
            />
          </Row>
        </DayCol>
      </Row2>
      <BottomRow>
        <SecondaryButton onPress={clearForm}>
          {t('productForm:clear')}
        </SecondaryButton>
        <Row>
          <ButtonWrapper>
            <AddButton onPress={handleSubmit}>
              <AddButtonText>{t('productForm:add')}</AddButtonText>
            </AddButton>
          </ButtonWrapper>
        </Row>
      </BottomRow>
    </Wrapper>
  );
};

ProductForm.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.object,
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

const HeadRow = styled(Row)`
  justify-content: space-between;
`;

const Row2 = styled(Row)`
  margin-top: 10px;
`;

const Col = styled.View`
  flex: 1;
  flex-direction: column;
`;

const HeadLeftCol = styled(Col)`
  flex: 2;
  align-items: flex-start;
`;

const HeadRightCol = styled(Col)`
  flex: 1;
  align-items: flex-end;
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

const NameInput = styled(Input)`
  width: 100%;
`;

const SmallEan13 = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 12px;
  color: ${props => props.theme.grey1};
  margin-top: 3px;
  margin-right: 3px;
`;

const StyledBarcode = styled(Icon)`
  color: ${props => props.theme.grey1};
`;

const StyledCameraLink = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`;

const StyledCamera = styled(Icon)`
  color: ${props => props.theme.black};
`;

const SmallScanText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 10px;
  color: ${props => props.theme.black};
`;

const BigText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.black};
  margin-bottom: ${Platform.OS === 'ios' ? '0px' : '8px'};
`;

const DateCol = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
`;

const DayCol = styled.TouchableOpacity`
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
  justify-content: space-between;
`;

const AddButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.primary};
  border-radius: 20px;
  padding: 5px 10px;
  padding-bottom: ${Platform.OS === 'ios' ? '0px' : '5px'};
`;

const AddButtonText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.white};
`;

const SecondaryButton = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 16px;
  color: ${props => props.theme.grey1};
  margin-top: ${Platform.OS === 'ios' ? '16px' : '7px'};
  margin-right: 10px;
`;
