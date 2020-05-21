import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Modal, TouchableOpacity } from 'react-native';

import TextInput from '../../Components/TextInput';
import Button from '../../Components/Button';

function ProductEditModal({
  product,
  visible,
  onDismiss,
  onRequestClose,
  onSubmit,
  isLoading,
  error,
}) {
  const [name, setName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [notificationDelay, setNotificationDelay] = useState('3');
  const [inputErrors, setInputErrors] = useState({});

  const dateRef = useRef();
  const notifRef = useRef();

  const prevLoading = useRef(false);

  // Update form with passed product
  useEffect(() => {
    if (product) {
      setName(product.name);
      setExpirationDate(product.expiration_date);
      setNotificationDelay(product.notification_delay.toString());
    }
  }, [product]);

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

  const handleSubmit = () => {
    if (name !== '' && expirationDate !== '' && notificationDelay !== '') {
      setInputErrors({});
      const editedProduct = {
        name,
        expirationDate,
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
            <Title>Modifier</Title>
            <TouchableOpacity onPress={onDismiss}>
              <CancelButton>Annuler</CancelButton>
            </TouchableOpacity>
          </Header>
          <FieldWrapper>
            <TextInput
              label="Nom"
              onChangeText={setName}
              required
              invalid={inputErrors.name}
              inputProps={{
                value: name,
                placeholder: 'Tomates',
                returnKeyType: 'next',
                onSubmitEditing: () => dateRef.current.focus(),
              }}
            />
            <TextInput
              label="Expire le"
              onChangeText={setExpirationDate}
              required
              invalid={inputErrors.expirationDate}
              inputProps={{
                ref: dateRef,
                value: expirationDate,
                placeholder: '01/01/2020',
                returnKeyType: 'next',
                onSubmitEditing: () => notifRef.current.focus(),
              }}
            />
            <TextInput
              label="Notification (jours)"
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
              }}
            />
          </FieldWrapper>
          <Button
            onPress={handleSubmit}
            title="Enregistrer"
            isLoading={isLoading}
          />
        </InnerWrapper>
      </Wrapper>
    </Modal>
  );
}

ProductEditModal.propTypes = {
  product: PropTypes.object,
  visible: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

ProductEditModal.defaultProps = {
  visible: false,
};

export default ProductEditModal;

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
