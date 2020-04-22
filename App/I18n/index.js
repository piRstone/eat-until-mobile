import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import DebugConfig from '../Config/DebugConfig';

i18n.use(initReactI18next).init({
  lng: 'fr',
  debug: DebugConfig.debugI18next,
  resources: {
    fr: {
      login: require('../Containers/LoginScreen/i18n/fr.json'),
      forgotPassword: require('../Containers/ForgotPasswordScreen/i18n/fr.json'),
      lists: require('../Containers/ListsScreen/i18n/fr.json'),
      products: require('../Containers/ProductsScreen/i18n/fr.json'),
    },
    en: {
      login: require('../Containers/LoginScreen/i18n/en.json'),
      forgotPassword: require('../Containers/ForgotPasswordScreen/i18n/en.json'),
      lists: require('../Containers/ListsScreen/i18n/en.json'),
      products: require('../Containers/ProductsScreen/i18n/en.json'),
    },
  },
});

export default i18n;
