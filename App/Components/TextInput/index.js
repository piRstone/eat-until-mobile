import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';

function TextInput({
  t,
  label,
  required,
  onChangeText,
  inputProps,
  noBorderBottom,
  invalid,
}) {
  return (
    <Wrapper noBorder={noBorderBottom} invalid={invalid}>
      <Label>
        {label}
        {required && <Required>*</Required>}
        {invalid && <Required> {t('textInput:required')}</Required>}
      </Label>
      <StyledInput onChangeText={onChangeText} {...inputProps} />
    </Wrapper>
  );
}

TextInput.propTypes = {
  t: PropTypes.func,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
  noBorderBottom: PropTypes.bool,
  invalid: PropTypes.bool,
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

const StyledInput = styled.TextInput`
  font-family: 'SofiaProRegular';
  font-size: 20px;
  color: ${props => props.theme.black};
`;
