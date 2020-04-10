import React, { useEffect } from 'react';

import { Text, View } from 'react-native'
import { auth } from '../config/firebase';

export default Authentication = ({ navigation }) => {
  useEffect(() => {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        console.log("redirecting......................")
        console.log(currentUser.email);
        if (currentUser.email == null) {
          navigation.navigate('Signup_details');
        }
        else {
          navigation.navigate('HomeScreen');
        }
      } else {
        navigation.navigate('LoginScreen');
      }
    });
  }, []);
  return (

    <View
      style={{
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text>Authenticating</Text>

    </View>

  );
};
