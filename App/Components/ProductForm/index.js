import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import { path } from 'ramda';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withTranslation } from 'react-i18next';

const ProductForm = ({ t, i18n, onSubmit, navigation }) => {
  const dateFormat = i18n.language === 'fr' ? 'DD/MM/YYYY' : 'YYYY-MM-DD';
  const expirationDateInputRef = useRef(null);
  const notifyDaysInputRef = useRef(null);
  const [name, setName] = useState('');
  const [expirationDate, setExpirationDate] = useState(moment().format(dateFormat));
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

  const handleDate = text => {
    setExpirationDate(text);

    if (text.length === 5) {
      // Auto fill year after type day and month then go to next field
      const currentYear = moment().get('year');
      const completeDate =
        i18n.language === 'fr'
          ? `${text}/${currentYear}`
          : `${currentYear}-${text}`;
      setExpirationDate(completeDate);
      notifyDaysInputRef.current.focus();
    }
    if (text.length === 10) {
      // Go to next field after correct the full date
      notifyDaysInputRef.current.focus();
    }
  };

  const checkDate = () => {
    const isValid = moment(expirationDate, dateFormat).isValid();
    setInputErrors({ ...inputErrors, expirationDate: !isValid });
  };

  const handleSubmit = () => {
    if (name !== '' && expirationDate !== '' && notifyDays !== '') {
      setInputErrors({});
      onSubmit({
        name,
        expiresAt: moment()
          .add(parseInt(expirationDate, 10) + 1, 'd')
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
      if (expirationDate === '') {
        errors.expirationDate = true;
      }
      if (notifyDays === '') {
        errors.notifyDays = true;
      }
      setInputErrors(errors);
    }
  };

  const clearForm = useCallback(() => {
    setName('');
    setExpirationDate(moment().format(dateFormat));
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
            onSubmitEditing={() =>
              expirationDateInputRef.current.getElement().focus()
            }
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
        <DateCol
          onPress={() => expirationDateInputRef.current.getElement().focus()}>
          <Label>{t('productForm:endsOn')}</Label>
          <Row>
            <StyledTextInputMask
              ref={expirationDateInputRef}
              type="datetime"
              options={{
                format: dateFormat,
              }}
              placeholder={t('productForm:datePlaceholder')}
              value={expirationDate}
              onChangeText={handleDate}
              onBlur={checkDate}
              keyboardType="number-pad"
              invalid={inputErrors.expirationDate}
              selectTextOnFocus
            />
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
              onSubmitEditing={handleSubmit}
              selectTextOnFocus
            />
          </Row>
        </DayCol>
      </Row2>
      {inputErrors.expirationDate && (
        <Row>
          <ErrorText>{t('productForm:dateError')}</ErrorText>
        </Row>
      )}
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
  i18n: PropTypes.object,
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

const StyledTextInputMask = styled(TextInputMask)`
  font-family: 'SofiaPro-Bold';
  font-size: 18px;
  height: 35px;
  width: 100%;
  color: ${props => props.theme.black};
  border-radius: 5px;
  padding: 0;
  border: ${props =>
    props.invalid
      ? `1px solid ${props.theme.red}`
      : `1px solid ${props.theme.white}`};
  background-color: ${props => props.theme.white};
  align-items: center;
  line-height: 16px;
`;

const DayInput = styled(Input)`
  font-family: 'SofiaProRegular';
  width: 100px;
`;

const ErrorText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 12px;
  color: ${props => props.theme.red};
  margin: 5px 0;
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
