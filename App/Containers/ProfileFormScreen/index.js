import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Keyboard, ScrollView } from 'react-native';
import { compose } from 'redux';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';

import UserActions from '../../Redux/UserRedux';
import Header from '../../Components/Header';
import TextInput from '../../Components/TextInput';
import Button from '../../Components/Button';

function ProfileFormScreen({ t, navigation, isLoading, save }) {
  const [userId, setUserId] = useState(undefined);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const lastnameRef = useRef();

  useEffect(() => {
    const user = navigation.getParam('user');
    if (user) {
      setUserId(user.id);
      setFirstname(user.firstName);
      setLastname(user.lastName);
    }
  }, [navigation]);

  const onSave = () => {
    save(userId, firstname, lastname);
    Keyboard.dismiss();
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Header onPress={() => navigation.goBack()} />
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always">
          <FieldWrapper>
            <TextInput
              label={t('profileForm:firstName')}
              onChangeText={setFirstname}
              inputProps={{
                value: firstname,
                autoCorrect: false,
                placeholder: t('profileForm:firstNamePlaceholder'),
                autoFocus: true,
                returnKeyType: 'next',
                onSubmitEditing: () => lastnameRef.current.focus(),
              }}
            />
            <TextInput
              label={t('profileForm:lastName')}
              onChangeText={setLastname}
              noBorderBottom
              inputProps={{
                ref: lastnameRef,
                value: lastname,
                autoCorrect: false,
                placeholder: t('profileForm:lastNamePlaceholder'),
                returnKeyType: 'next',
                onSubmitEditing: onSave,
              }}
            />
          </FieldWrapper>
          <Button
            onPress={onSave}
            disabled={isLoading}
            title={t('profileForm:save')}
            isLoading={isLoading}
          />
        </ScrollView>
      </InnerWrapper>
    </Wrapper>
  );
}

ProfileFormScreen.propTypes = {
  t: PropTypes.func,
  navigation: PropTypes.object,
  isLoading: PropTypes.bool,
  save: PropTypes.func,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = dispatch => ({
  save: (userId, firstname, lastname) =>
    dispatch(UserActions.edit(userId, firstname, lastname)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withTranslation(),
)(ProfileFormScreen);

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;

const InnerWrapper = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;

const FieldWrapper = styled.View`
  border-radius: 10px;
  overflow: hidden;
`;
