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
  const [email, setEmail] = useState('');
  const lastnameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    const user = navigation.getParam('user');
    if (user) {
      setUserId(user.id);
      setFirstname(user.first_name);
      setLastname(user.last_name);
      setEmail(user.email);
    }
  }, [navigation]);

  const onSave = () => {
    save(userId, firstname, lastname, email);
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
              inputProps={{
                ref: lastnameRef,
                value: lastname,
                autoCorrect: false,
                placeholder: t('profileForm:lastNamePlaceholder'),
                autoFocus: true,
                returnKeyType: 'next',
                onSubmitEditing: () => emailRef.current.focus(),
              }}
            />
            <TextInput
              label="Email"
              onChangeText={setEmail}
              noBorderBottom
              required
              inputProps={{
                ref: emailRef,
                value: email,
                autoCorrect: false,
                autoCapitalize: 'none',
                keyboardType: 'email-address',
                placeholder: t('profileForm:emailPlaceholder'),
                returnKeyType: 'next',
                onSubmitEditing: onSave,
              }}
            />
          </FieldWrapper>
          <Button
            onPress={onSave}
            disabled={!email || isLoading}
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
  save: (userId, firstname, lastname, email) =>
    dispatch(UserActions.edit(userId, firstname, lastname, email)),
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
