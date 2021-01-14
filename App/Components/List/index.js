import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';
import FeatherIcon from 'react-native-vector-icons/Feather';

function List({ t, list, onPress, disabled }) {
  return (
    <Wrapper key={list.id} onPress={onPress} disabled={disabled}>
      <Col>
        <ListName>{list.name}</ListName>
        <ProductsCount>
          {list.productsCount
            ? t('lists:productsCount', { count: list.productsCount })
            : t('lists:noProducts')}
        </ProductsCount>
      </Col>
      <ChevronIcon name="chevron-right" size={20} />
    </Wrapper>
  );
}

List.propTypes = {
  t: PropTypes.func,
  list: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default withTranslation()(List);

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 20px 10px;
  background-color: ${props => props.theme.whiteBackground};
  margin-bottom: 20px;
`;

const ListName = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 18px;
  color: ${props => props.theme.black};
`;

const ProductsCount = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.grey1};
  margin-top: ${Platform.OS === 'ios' ? '0px' : '5px'};
`;

const Col = styled.View``;

const ChevronIcon = styled(FeatherIcon)`
  color: ${props => props.theme.grey1};
`;
