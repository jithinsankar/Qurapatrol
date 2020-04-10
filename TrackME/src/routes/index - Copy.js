import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Authentication from '../screens/Authentication';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import mapwala from '../screens/mapwala';
import bgloc from '../screens/bgloc';
import qr from '../screens/qr'
const authenticationStack = createStackNavigator(
  {
    LoginScreen: {
      screen: Login
    },
    SignupScreen: {
      screen: Signup
    }
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none'
  }
);

const authenticationSwitch = createSwitchNavigator(
  {
    AuthenticationScreen: {
      screen: Authentication
    },
    HomeScreen: {
      screen: Home
    },
    Mapwala: {
      screen: mapwala
    },
    bgloc: {
      screen: bgloc
    },
    qr: {
      screen: qr
    },
    AuthenticationStack: {
      screen: authenticationStack
    }
  },
  { initialRouteName: 'AuthenticationScreen' }
);

export default createAppContainer(authenticationSwitch);
