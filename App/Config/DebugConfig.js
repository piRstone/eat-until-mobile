const { __TEST__ } = global;

export default {
  useFixtures: false,
  ezLogin: false,
  yellowBox: __DEV__,
  reduxLogging: __DEV__,
  includeExamples: __DEV__,
  useReactotron: __DEV__,
  debugI18next: __DEV__ && !__TEST__,
  useStorybook: false,
};
