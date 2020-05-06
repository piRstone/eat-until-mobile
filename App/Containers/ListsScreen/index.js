import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import { withTranslation } from 'react-i18next';

import ListsActions from '../../Redux/ListsRedux';
import ListForm from '../../Components/ListForm';
import List from '../../Components/List';

export function ListsScreen({
  t,
  navigation,
  lists,
  isLoading,
  isCreateLoading,
  getLists,
  createList,
}) {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      getLists();
    }, 10);
  }, [getLists]);

  const handleListPress = list => {
    navigation.navigate('ProductsScreen', { list });
  };

  const handleSubmit = value => {
    if (value !== '') {
      createList(value);
      Keyboard.dismiss();
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Header>
          <Title>{t('lists:title')}</Title>
          <UserPic onPress={() => navigation.navigate('ProfileScreen')}>
            <UserPicIcon name="user" size={20} />
          </UserPic>
        </Header>
        <KeyboardAvoidingView behavior="height" enabled={showForm}>
          {showForm && (
            <ListForm onSubmit={handleSubmit} isLoading={isCreateLoading} />
          )}
          {lists.length ? (
            <FlatList
              data={lists}
              refreshing={isLoading}
              onRefresh={() => getLists()}
              style={{ height: '80%' }}
              renderItem={({ item }) => (
                <List
                  key={item.id}
                  list={item}
                  onPress={() => handleListPress(item)}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
          ) : (
            <EmptyState>{t('lists:noLists')}</EmptyState>
          )}
        </KeyboardAvoidingView>
      </InnerWrapper>
      <CreateListButton onPress={() => setShowForm(!showForm)}>
        <CreateListButtonText>{t('lists:create')}</CreateListButtonText>
      </CreateListButton>
    </Wrapper>
  );
}

ListsScreen.propTypes = {
  t: PropTypes.func,
  navigation: PropTypes.object,
  lists: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  isCreateLoading: PropTypes.bool,
  getLists: PropTypes.func,
  createList: PropTypes.func,
};

const mapStateToProps = state => ({
  lists: state.lists.data,
  isLoading: state.lists.isLoading,
  isCreateLoading: state.lists.isCreateLoading,
});

const mapDispatchToProps = dispatch => ({
  getLists: () => dispatch(ListsActions.request()),
  createList: name => dispatch(ListsActions.create(name)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withTranslation(),
)(ListsScreen);

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.SafeAreaView`
  flex: 1;
  margin: 50px 20px 40px 20px;
  margin-top: ${DeviceInfo.hasNotch() ? '50px' : '20px'};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`;

const UserPic = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.whiteBackground};
`;

const UserPicIcon = styled(Icon)`
  color: ${props => props.theme.black};
`;

const Title = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 30px;
  color: ${props => props.theme.black};
  padding-top: ${Platform.OS === 'ios' ? '10px' : '0'};
`;

const CreateListButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 50px;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 10px;
  background-color: ${props => props.theme.primary};
  padding-top: ${Platform.OS === 'ios' ? '5px' : '0'};
`;

const CreateListButtonText = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 16px;
  color: ${props => props.theme.white};
`;

const EmptyState = styled.Text`
  font-family: 'SofiaProRegular';
  color: ${props => props.theme.grey1};
  margin-top: 30px;
`;
