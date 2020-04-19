import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Keyboard, KeyboardAvoidingView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import UserActions from '../../Redux/UserRedux';
import ListsActions from '../../Redux/ListsRedux';
import ListForm from '../../Components/ListForm';

export function ListsScreen({
  navigation,
  logout,
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
  }, []);

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
          <Title>Mes listes</Title>
          <UserPic onPress={logout}>
            <UserPicIcon name="sign-out" size={20} />
          </UserPic>
        </Header>
        <KeyboardAvoidingView behavior="height" enabled={showForm}>
          {showForm && (
            <ListForm onSubmit={handleSubmit} isLoading={isCreateLoading} />
          )}
          <FlatList
            data={lists}
            refreshing={isLoading}
            onRefresh={() => getLists()}
            renderItem={({ item }) => (
              <List key={item.id} onPress={() => handleListPress(item)}>
                <ListName>{item.name}</ListName>
                <ChevronIcon name="chevron-right" size={16} />
              </List>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </KeyboardAvoidingView>
      </InnerWrapper>
      <CreateListButton onPress={() => setShowForm(!showForm)}>
        <CreateListButtonText>Créer une liste</CreateListButtonText>
      </CreateListButton>
    </Wrapper>
  );
}

ListsScreen.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object),
  logout: PropTypes.func,
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
  logout: () => dispatch(UserActions.logout()),
  getLists: () => dispatch(ListsActions.request()),
  createList: name => dispatch(ListsActions.create(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListsScreen);

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.SafeAreaView`
  flex: 1;
  margin: 50px 20px 40px 20px;
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
  padding-top: 10px;
`;

const List = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  padding: 30px 10px 20px 10px;
  background-color: ${props => props.theme.whiteBackground};
  margin-bottom: 20px;
`;

const ListName = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 18px;
  color: ${props => props.theme.black};
`;

const ChevronIcon = styled(Icon)`
  color: ${props => props.theme.grey1};
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
  padding-top: 5px;
`;

const CreateListButtonText = styled.Text`
  font-family: 'SofiaPro-Bold';
  font-size: 16px;
  color: ${props => props.theme.white};
`;
