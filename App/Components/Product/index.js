import React from 'react';
import { ActionSheetIOS, Alert, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import moment from 'moment';

export function Product({ data }) {
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

  const onPressProduct = product => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Modifier', 'Supprimer', 'Annuler'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            // TODO: edit action
          } else if (buttonIndex === 1) {
            // TODO: delete action
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
            onPress: () => {
              console.tron.log(`Supprimer ${product.name}`);
            },
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
  data: PropTypes.object.isRequired,
};

export default Product;

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
