import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Authentication from '../screens/Authentication';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import qrscanscreen from '../screens/qrscan';
import mapwala from '../screens/mapwala';
import recentscans from '../screens/recentscans';
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

const HomeScreenStack = createStackNavigator(   
  {
    HomeScreen: {
    screen: Home
    },
    qrscanscreen:{
     screen:qrscanscreen
    },
    mapwala:{
     screen:mapwala
    },
    recentscans:{
      screen:recentscans
    },

  } ,
  {
  initialRouteName: 'HomeScreen',
  headerMode: 'none'
  });

const authenticationSwitch = createSwitchNavigator(
  {
    AuthenticationScreen: {
      screen: Authentication
    },
    homeScreenStack:{
      screen:HomeScreenStack
    },
    AuthenticationStack: {
      screen: authenticationStack
    }
  },
  { initialRouteName: 'AuthenticationScreen' }
);


export default createAppContainer(authenticationSwitch);
