import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';

import UserActions from '../../Redux/UserRedux';
import List from '../../Components/List';
import Product from '../../Components/Product';
import Button from '../../Components/Button';
import Slide from './Slide';

function Onboarding({ t, navigation, done }) {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef();

  const data = [
    {
      id: 1,
      title: t('onboarding:step1Title'),
      text: t('onboarding:step1Text'),
      component: (
        <List
          list={{
            name: t('onboarding:fridge'),
            products_count: 28,
          }}
        />
      ),
    },
    {
      id: 2,
      title: t('onboarding:step2Title'),
      text: t('onboarding:step2Text'),
      component: (
        <Product
          data={{
            name: t('onboarding:tomatoes'),
            expiration_date: moment()
              .add(3, 'days')
              .format('YYYY-MM-DD'),
          }}
          disablePress
        />
      ),
    },
  ];

  const onSwipePageChange = useCallback(({ viewableItems }) => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;

    setCurrentPage(viewableItems[0].index);
  }, []);

  const onPressNext = () => {
    if (currentPage === 1) {
      done();
      navigation.navigate('AuthStack');
    } else {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentPage + 1,
      });
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={item => item.id}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
          initialNumToRender={1}
          onViewableItemsChanged={onSwipePageChange}
          renderItem={({ item }) => (
            <Slide
              title={item.title}
              text={item.text}
              component={item.component}
            />
          )}
        />
        <ButtonWrapper>
          <Button
            title={
              currentPage === 0 ? t('onboarding:next') : t('onboarding:done')
            }
            onPress={onPressNext}
          />
        </ButtonWrapper>
      </InnerWrapper>
    </Wrapper>
  );
}

Onboarding.propTypes = {
  t: PropTypes.func,
  navigation: PropTypes.object,
  done: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  done: () => dispatch(UserActions.setHasEverLaunchedApp()),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withTranslation(),
)(Onboarding);

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.SafeAreaView`
  flex: 1;
  margin: 50px 0;
  margin-top: ${DeviceInfo.hasNotch() ? '50px' : '20px'};
`;

const ButtonWrapper = styled.View`
  margin: 0 20px;
`;
