import React, { useState, useCallback } from 'react';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';

import ProductsActions from '../../Redux/ProductsRedux';

export function CameraScreen({ getProductData }) {
  const [ean13, setEan13] = useState(undefined);

  const onSubmit = () => {
    if (ean13.length === 13 && !isNaN(ean13)) {
      getProductData(ean13);
    }
  };

  const handleBarcoreRead = e => {
    console.tron.warn(e);
  };

  return (
    <Wrapper>
      <TextInput
        onChangeText={e => setEan13(e)}
        placeholder="Code barre"
        autoFocus
        returnKeyType="done"
        value={ean13}
        onSubmitEditing={onSubmit}
      />
      <RNCamera
        style={{ flex: 1 }}
        barCodeTypes={[
          RNCamera.Constants.BarCodeType.ean13,
          RNCamera.Constants.BarCodeType.datamatrix,
        ]}
        onBarCodeRead={handleBarcoreRead}
      />
    </Wrapper>
  );
}

CameraScreen.propTypes = {
  getProductData: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  getProductData: ean13 => dispatch(ProductsActions.getOffData(ean13)),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(CameraScreen);

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;
