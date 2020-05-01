import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native-device-info', () => ({
  getApplicationName: () => 'Eat Until',
  getVersion: () => '1.0.0',
  getModel: () => 'iPhone 11 Pro',
  hasNotch: () => false,
}));
