import React from 'react';
import { StatusBar, Vibration } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import DeviceInfo from 'react-native-device-info';
import { withTranslation } from 'react-i18next';

import ProductsActions from '../../Redux/ProductsRedux';
import Header from '../../Components/Header';
import { Metrics } from '../../Themes';

export function CameraScreen({ t, navigation, getProductData, isLoading }) {
  const handleBarcoreRead = e => {
    const type = RNCamera.Constants.BarCodeType.ean13;
    if (e.type === type && !isLoading) {
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
      <ExplanationWrapper>
        <Explanation>{t('camera:explanation')}</Explanation>
      </ExplanationWrapper>
    </Wrapper>
  );
}

CameraScreen.propTypes = {
  t: PropTypes.func,
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withTranslation(),
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

const ExplanationWrapper = styled.View`
  position: absolute;
  bottom: 50px;
  left: 20px;
  width: ${Metrics.screenWidth - 40}px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  padding: 10px;
  padding-bottom: ${Platform.OS === 'ios' ? '6px' : '10px'};
`;

const Explanation = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 14px;
  text-align: center;
`;
