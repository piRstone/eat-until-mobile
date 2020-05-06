import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import DebugConfig from '../Config/DebugConfig';
import { NativeModules, Platform } from 'react-native';

// Determine default language according to device's one
let defaultLanguage = 'fr';
let lng;
if (Platform.OS === 'ios') {
  lng = NativeModules.SettingsManager.settings.AppleLocale;
} else {
  lng = NativeModules.I18nManager.localeIdentifier;
}
defaultLanguage = lng.split('_')[0];

i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  debug: DebugConfig.debugI18next,
  resources: {
    fr: {
      login: require('../Containers/LoginScreen/i18n/fr.json'),
      register: require('../Containers/RegisterScreen/i18n/fr.json'),
      registerSuccess: require('../Containers/RegisterSuccessScreen/i18n/fr.json'),
      activation: require('../Containers/ActivationScreen/i18n/fr.json'),
      notification: require('../Containers/Notification/i18n/fr.json'),
      forgotPassword: require('../Containers/ForgotPasswordScreen/i18n/fr.json'),
      lists: require('../Containers/ListsScreen/i18n/fr.json'),
      profile: require('../Containers/ProfileScreen/i18n/fr.json'),
      profileForm: require('../Containers/ProfileFormScreen/i18n/fr.json'),
      products: require('../Containers/ProductsScreen/i18n/fr.json'),
      product: require('../Components/Product/i18n/fr.json'),
      productForm: require('../Components/ProductForm/i18n/fr.json'),
    },
    en: {
      login: require('../Containers/LoginScreen/i18n/en.json'),
      register: require('../Containers/RegisterScreen/i18n/en.json'),
      registerSuccess: require('../Containers/RegisterSuccessScreen/i18n/en.json'),
      activation: require('../Containers/ActivationScreen/i18n/en.json'),
      notification: require('../Containers/Notification/i18n/en.json'),
      forgotPassword: require('../Containers/ForgotPasswordScreen/i18n/en.json'),
      lists: require('../Containers/ListsScreen/i18n/en.json'),
      profile: require('../Containers/ProfileScreen/i18n/en.json'),
      profileForm: require('../Containers/ProfileFormScreen/i18n/en.json'),
      products: require('../Containers/ProductsScreen/i18n/en.json'),
      product: require('../Components/Product/i18n/en.json'),
      productForm: require('../Components/ProductForm/i18n/en.json'),
    },
  },
});

export default i18n;
