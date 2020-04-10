import React, { useEffect } from 'react';

import { Text , View } from 'react-native'
import { auth } from '../config/firebase';

export default Authentication = ({ navigation }) => {
  useEffect(() => {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        navigation.navigate('homeScreenStack');
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
