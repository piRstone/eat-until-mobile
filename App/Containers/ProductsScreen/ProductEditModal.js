import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  Alert,
  Keyboard,
  Modal,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { withTranslation } from 'react-i18next';
import moment from 'moment';

import DateInput from '../../Components/DateInput';
import TextInput from '../../Components/TextInput';
import Button from '../../Components/Button';

function ProductEditModal({
  t,
  i18n,
  product,
  visible,
  onDismiss,
  onRequestClose,
  onSubmit,
  onDelete,
  isLoading,
  error,
}) {
  const [name, setName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [notificationDelay, setNotificationDelay] = useState('3');
  const [inputErrors, setInputErrors] = useState({});
  const [isKeybordOpened, setiIsKeybordOpened] = useState(false);

  const showListener = useRef();
  const hideListener = useRef();

  const dateRef = useRef();
  const notifRef = useRef();
  const prevLoading = useRef(false);

  const dateFormat = i18n.language === 'fr' ? 'DD/MM/YYYY' : 'YYYY-MM-DD';

  // Watch keyboard status
  useEffect(() => {
    showListener.current = Keyboard.addListener('keyboardDidShow', () =>
      setiIsKeybordOpened(true),
    );
    hideListener.current = Keyboard.addListener('keyboardDidHide', () =>
      setiIsKeybordOpened(false),
    );

    return () => {
      showListener.current.remove();
      hideListener.current.remove();
    };
  });

  // Update form with passed product
  useEffect(() => {
    if (product) {
      setName(product.name);

      const expDate = moment(product.expirationDate).format(
        dateFormat,
      );
      setExpirationDate(expDate);
      setNotificationDelay(product.notificationDelay.toString());
    }
  }, [product, dateFormat]);

  // Check loading state to know if edit is done
  useEffect(() => {
    if (isLoading && !prevLoading.current) {
      prevLoading.current = true;
    }

    // Finish loading with no error = success
    if (!isLoading && prevLoading.current && !error) {
      prevLoading.current = false;
      onDismiss();
    }
  }, [isLoading, error, onDismiss]);

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
      notifRef.current.focus();
    }
    if (text.length === 10) {
      // Go to next field after correct the full date
      notifRef.current.focus();
    }
  };

  const checkDate = () => {
    const isValid = moment(expirationDate, dateFormat).isValid();
    setInputErrors({ ...inputErrors, expirationDate: !isValid });
  };

  const handleSubmit = () => {
    if (name !== '' && expirationDate !== '' && notificationDelay !== '') {
      setInputErrors({});
      const editedProduct = {
        name,
        expirationDate: moment(expirationDate, dateFormat).format('YYYY-MM-DD'),
        notificationDelay,
      };
      onSubmit(product.id, editedProduct);
    } else {
      let errors = {};
      if (name === '') {
        errors.name = true;
      }
      if (expirationDate === '') {
        errors.expirationDate = true;
      }
      if (notificationDelay === '') {
        errors.notificationDelay = true;
      }
      setInputErrors(errors);
    }
  };

  const handleRemove = () => {
    Alert.alert(
      t('product:delete'),
      t('product:deleteText'),
      [
        {
          text: t('product:cancel'),
        },
        {
          text: t('product:delete'),
          onPress: () => {
            onDelete(product.id);
            onDismiss();
          },
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <Modal
      animationType="slide"
      // presentationStyle="formSheet" // Wait for a solution for the swipe down problem https://github.com/facebook/react-native/issues/26892
      visible={visible}
      onDismiss={onDismiss}
      onRequestClose={onRequestClose}>
      <Wrapper>
        <InnerWrapper>
          <Header>
            <Title>{t('products:edit')}</Title>
            <TouchableOpacity onPress={onDismiss}>
              <CancelButton>{t('products:cancel')}</CancelButton>
            </TouchableOpacity>
          </Header>
          <ScrollView
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            style={{ flex: 1 }}>
            <FieldWrapper>
              <TextInput
                label={t('products:name')}
                onChangeText={setName}
                required
                invalid={inputErrors.name}
                inputProps={{
                  value: name,
                  placeholder: t('products:namePlaceholder'),
                  returnKeyType: 'next',
                  onSubmitEditing: () => dateRef.current.getElement().focus(),
                }}
              />
              <DateInput
                label={t('products:expiresOn')}
                onChangeText={handleDate}
                required
                invalid={inputErrors.expirationDate}
                inputProps={{
                  ref: dateRef,
                  value: expirationDate,
                  onSubmitEditing: () => notifRef.current.focus(),
                  onBlur: checkDate,
                }}
              />
              <TextInput
                label={t('products:notif')}
                onChangeText={setNotificationDelay}
                noBorderBottom
                required
                invalid={inputErrors.notificationDelay}
                inputProps={{
                  ref: notifRef,
                  value: notificationDelay,
                  placeholder: '3',
                  keyboardType: 'number-pad',
                  returnKeyType: 'done',
                  onSubmitEditing: () => {},
                  selectTextOnFocus: true,
                }}
              />
            </FieldWrapper>
            <Button
              onPress={handleSubmit}
              title={t('products:save')}
              isLoading={isLoading}
            />
          </ScrollView>
          {!isKeybordOpened && (
            <DangerZone>
              <DangerButton onPress={handleRemove}>
                <DangerButtonText>{t('products:delete')}</DangerButtonText>
              </DangerButton>
            </DangerZone>
          )}
        </InnerWrapper>
      </Wrapper>
    </Modal>
  );
}

ProductEditModal.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object,
  product: PropTypes.object,
  visible: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

ProductEditModal.defaultProps = {
  visible: false,
};

export default withTranslation()(ProductEditModal);

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.View`
  padding: 10px 20px;
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 30px;
  color: ${props => props.theme.black};
`;

const CancelButton = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 18px;
  color: ${props => props.theme.primary};
`;

const FieldWrapper = styled.View`
  border-radius: 10px;
  overflow: hidden;
`;

const DangerZone = styled.View`
  flex-direction: row;
  margin-top: auto;
`;

const DangerButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  border: ${props =>
    props.disabled
      ? `1px solid ${props.theme.grey1}`
      : `1px solid ${props.theme.red}`};
  border-radius: 10px;
  margin: 10px 5px;
  padding: 12px 20px 7px;
  padding-bottom: ${Platform.OS === 'ios' ? '7px' : '12px'};
`;

const DangerButtonText = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 14px;
  color: ${props => (props.disabled ? props.theme.grey1 : props.theme.red)};
`;
