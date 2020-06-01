import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';
import { withTranslation } from 'react-i18next';

function TextInput({
  t,
  i18n,
  label,
  required,
  onChangeText,
  format,
  inputProps,
  noBorderBottom,
  invalid,
  errorMessage,
}) {
  const defaultFormat = i18n.language === 'fr' ? 'DD/MM/YYYY' : 'YYYY-MM-DD';
  const dateFormat = format || defaultFormat;

  return (
    <Wrapper noBorder={noBorderBottom} invalid={invalid}>
      <Label>
        {label}
        {required && <Required>*</Required>}
        {invalid && (
          <Required>
            {' '}
            {errorMessage ? errorMessage : t('dateInput:required')}
          </Required>
        )}
      </Label>
      <StyledTextInputMask
        type="datetime"
        options={{
          format: dateFormat,
        }}
        placeholder={t('dateInput:datePlaceholder')}
        onChangeText={onChangeText}
        keyboardType="number-pad"
        selectTextOnFocus
        {...inputProps}
      />
    </Wrapper>
  );
}

TextInput.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  format: PropTypes.string,
  inputProps: PropTypes.shape({
    ref: PropTypes.object,
    value: PropTypes.string,
    onSubmitEditing: PropTypes.func,
    onBlur: PropTypes.func,
  }),
  noBorderBottom: PropTypes.bool,
  invalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default withTranslation()(TextInput);

const Wrapper = styled.View`
  padding: 10px;
  border-bottom-width: ${props => (props.noBorder ? '0px' : '1px')};
  border-bottom-color: ${props => props.theme.grey2};
  background-color: ${props => props.theme.whiteBackground};
`;

const Label = styled.Text`
  font-family: 'SofiaProRegular';
  font-size: 12px;
  color: ${props => props.theme.grey1};
  margin: 0;
  margin-bottom: 5px;
`;

const Required = styled(Label)`
  color: ${props => props.theme.red};
`;

const StyledTextInputMask = styled(TextInputMask)`
  font-family: 'SofiaProRegular';
  font-size: 20px;
  color: ${props => props.theme.black};
`;
