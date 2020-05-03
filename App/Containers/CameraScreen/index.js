import React, { useState } from 'react';
import { TextInput, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import DeviceInfo from 'react-native-device-info';

import ProductsActions from '../../Redux/ProductsRedux';
import Header from '../../Components/Header';

export function CameraScreen({ navigation, getProductData, isLoading }) {
  const [ean13, setEan13] = useState(undefined);

  const onSubmit = () => {
    if (ean13.length === 13 && !isNaN(ean13)) {
      getProductData(ean13);
    }
  };

  const handleBarcoreRead = e => {
    const type = RNCamera.Constants.BarCodeType.ean13;
    if (e.type === type) {
      getProductData(e.data);
    }
  };

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" />
      {/* <TextInput
        onChangeText={e => setEan13(e)}
        placeholder="Code barre"
        returnKeyType="done"
        value={ean13}
        onSubmitEditing={onSubmit}
      /> */}
      <RNCamera
        style={{ flex: 1 }}
        captureAudio={false}
        barCodeTypes={[
          RNCamera.Constants.BarCodeType.ean13,
          RNCamera.Constants.BarCodeType.datamatrix,
        ]}
        onBarCodeRead={handleBarcoreRead}
      />
      <HeaderWrapper>
        <Header onPress={() => navigation.goBack()} barStyle="light" />
      </HeaderWrapper>
    </Wrapper>
  );
}

CameraScreen.propTypes = {
  navigation: PropTypes.object,
  isLoading: PropTypes.bool,
  getProductData: PropTypes.func,
};

const mapStateToProps = state => ({
  isLoading: state.products.isOffLoading,
});

const mapDispatchToProps = dispatch => ({
  getProductData: ean13 => dispatch(ProductsActions.getOffData(ean13)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CameraScreen);

const Wrapper = styled.View`
  flex: 1;
`;

const HeaderWrapper = styled.View`
  position: absolute;
  left: 20px;
  right: 20px;
  top: ${DeviceInfo.hasNotch() ? '50px' : '0px'};
`;
