import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import DebugConfig from '../Config/DebugConfig';
import { NativeModules, Platform } from 'react-native';

// Determine default language according to device's one
let lng = 'fr';
if (Platform.OS === 'ios') {
  lng = NativeModules.SettingsManager.settings.AppleLocale;
  if (lng === undefined) {
    // iOS 13 workaround, take first of AppleLanguages array ["en", "fr-FR"]
    const iosLng = NativeModules.SettingsManager.settings.AppleLanguages[0];
    if (iosLng === undefined) {
      lng = 'fr'; // default language
    } else {
      lng = iosLng.split('-')[0];
    }
  } else {
    lng = lng.split('_')[0];
  }
} else {
  lng = NativeModules.I18nManager.localeIdentifier.split('_')[0];
}

i18n.use(initReactI18next).init({
  lng,
  debug: DebugConfig.debugI18next,
  resources: {
    fr: {
      onboarding: require('../Containers/Onboarding/i18n/fr.json'),
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
      camera: require('../Containers/CameraScreen/i18n/fr.json'),
      product: require('../Components/Product/i18n/fr.json'),
      productForm: require('../Components/ProductForm/i18n/fr.json'),
      textInput: require('../Components/TextInput/i18n/fr.json'),
    },
    en: {
      onboarding: require('../Containers/Onboarding/i18n/en.json'),
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
      camera: require('../Containers/CameraScreen/i18n/en.json'),
      product: require('../Components/Product/i18n/en.json'),
      productForm: require('../Components/ProductForm/i18n/en.json'),
      textInput: require('../Components/TextInput/i18n/en.json'),
    },
  },
});

export default i18n;
