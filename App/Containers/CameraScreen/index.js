import React from 'react';
import { StatusBar, Vibration } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import DeviceInfo from 'react-native-device-info';

import ProductsActions from '../../Redux/ProductsRedux';
import Header from '../../Components/Header';
import { Metrics } from '../../Themes';

export function CameraScreen({ navigation, getProductData, isLoading }) {
  const handleBarcoreRead = e => {
    const type = RNCamera.Constants.BarCodeType.ean13;
    if (e.type === type) {
      Vibration.vibrate();
      getProductData(e.data);
    }
  };

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" />
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
      {isLoading && <StyledActivityIndicator color="#ffffff" size="large" />}
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

const StyledActivityIndicator = styled.ActivityIndicator`
  position: absolute;
  left: ${Metrics.screenWidth / 2 - 15};
  top: ${Metrics.screenHeight / 2 - 15};
`;
