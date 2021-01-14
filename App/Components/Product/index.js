import React from 'react';
import { ActionSheetIOS, Alert, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Product({ t, data, onEdit, onRemove, disabled }) {
  const remainingDays = moment(data.expirationDate).diff(
    moment(),
    'd',
  );
  const remainingYears = moment(data.expirationDate).diff(
    moment(),
    'y',
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
    if (disabled) return;

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
            onEdit(product);
          } else if (buttonIndex === 1) {
            handleRemove(product.id);
          }
        },
      );
    } else {
      // On Android, open edit modal on product press
      onEdit(product);
    }
  };

  return (
    <Wrapper onPress={() => onPressProduct(data)} disabled={disabled}>
      <View style={{ width: '80%' }}>
        <Name numberOfLines={1}>{data.name}</Name>
        <Row>
          <SecondaryText>
            {moment(data.expirationDate).format('DD/MM/YYYY')}
          </SecondaryText>
          <Row>
            <StyledIcon name="bell" />
            <SecondaryText>
              {t('product:days').toUpperCase()}-{data.notificationDelay}
            </SecondaryText>
          </Row>
        </Row>
      </View>
      <Days style={dayClass}>
        {remainingDays < 365
          ? `${remainingDays} ${t('product:days')}`
          : `${remainingYears} ${t('product:years')}`}
      </Days>
    </Wrapper>
  );
}

Product.propTypes = {
  t: PropTypes.func,
  data: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
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

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Name = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 18px;
  color: ${props => props.theme.black};
`;

const SecondaryText = styled.Text`
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

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.grey1};
  font-size: 12px;
  margin-left: 15px;
  margin-right: 2px;
  padding-top: ${Platform.OS === 'ios' ? 0 : '7px'};
`;
