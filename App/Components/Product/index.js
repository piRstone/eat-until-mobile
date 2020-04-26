import React from 'react';
import { ActionSheetIOS, Alert, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import moment from 'moment';
import { withTranslation } from 'react-i18next';

export function Product({ t, data, onRemove }) {
  const remainingDays = moment(data.expiration_date, 'YYYY-MM-DD').diff(
    moment(),
    'd',
  );
  let dayClass;
  if (remainingDays < 3) {
    dayClass = 'danger';
  } else if (remainingDays > 2 && remainingDays < 5) {
    dayClass = 'warning';
  } else {
    dayClass = 'success';
  }

  const handleRemove = id => {
    Alert.alert(
      t('product:delete'),
      t('product:deleteText'),
      [
        {
          text: t('product:cancel'),
        },
        {
          text: t('product:delete'),
          onPress: () => onRemove(id),
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  const onPressProduct = product => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            t('product:edit'),
            t('product:delete'),
            t('product:cancel'),
          ],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            // TODO: edit action
          } else if (buttonIndex === 1) {
            handleRemove(product.id);
          }
        },
      );
    } else {
      Alert.alert(
        product.name,
        '',
        [
          {
            text: 'Annuler',
            onPress: () => {},
          },
          {
            text: 'Modifier',
            onPress: () => console.log('Dialog dismissed'),
            style: 'cancel',
          },
          {
            text: 'Supprimer',
            onPress: () => handleRemove(product.id),
            style: 'destructive',
          },
        ],
        { cancelable: true },
      );
    }
  };

  return (
    <Wrapper onPress={() => onPressProduct(data)}>
      <View>
        <Name>{data.name}</Name>
        <Date>
          {moment(data.expiration_date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
        </Date>
      </View>
      <Days style={dayClass}>{remainingDays} j</Days>
    </Wrapper>
  );
}

Product.propTypes = {
  t: PropTypes.func,
  data: PropTypes.object.isRequired,
  onRemove: PropTypes.func,
};

export default withTranslation()(Product);

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 15px 10px 10px 10px;
  background-color: ${props => props.theme.whiteBackground};
  margin-bottom: 10px;
`;

const Name = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 18px;
  color: ${props => props.theme.black};
`;

const Date = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 14px;
  color: ${props => props.theme.grey1};
  margin-top: 5px;
`;

/* eslint-disable indent */
const Days = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 22px;
  color: ${props =>
    props.style === 'danger'
      ? props.theme.red
      : props.style === 'warning'
      ? props.theme.orange
      : props.theme.green};
`;
