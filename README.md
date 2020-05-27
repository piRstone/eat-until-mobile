#  Eat Until Mobile

**Never waste food anymore!**

List everything you don't want to loose if you forget it at the bottom of your shelf! You'll be notified some days before the expiration date so you can cook and eat it.

_This project has been started from [Ignite](https://github.com/infinitered/ignite)._

Note: this project depends on the [eat-until-api](https://github.com/piRstone/eat-until-api) backend.

## Setup

**Step 1:** git clone this repo

**Step 2:** cd to the cloned repo.

**Step 3:** Install dependencies with `yarn`.


## How to Run App

1. cd to the repo.
2. Copy `.env.example` as `.env` and set the `API_URL` constant to you point on your API
3. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * start an emulator
    * run `react-native run-android`


**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com/api
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Get started:
1. Copy .env.example to .env
2. Add your config variables
3. Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4. Done!

## Roadmap

- Setup Push Notifications
- Bulk add products by scanning their EAN13 barcode.
- Be able to scan drugs package datamatrix code and retrieve their data.
