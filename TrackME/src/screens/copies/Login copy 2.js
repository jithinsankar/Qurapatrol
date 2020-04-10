import React, { useState } from 'react';
import {
  Button,

  Spinner,

} from 'native-base';
import { Text, TextInput, View } from 'react-native'
import { auth } from '../config/firebase';

export default Login = ({ navigation }) => {
  const [txtEmail, setEmail] = useState('');
  const [txtPassword, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const signIn = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(txtEmail, txtPassword)
      .then(result => {
        if (result) {
          setLoading(false);
          navigation.navigate('HomeScreen');
        }
      })
      .catch(({ message }) => {
        alert(message);
        setLoading(false);
      });
  };
  return (
    <View>
      <TextInput value={txtEmail} onChangeText={txtEmail => setEmail(txtEmail)} />

      <TextInput
        secureTextEntry
        value={txtPassword}
        onChangeText={txtPassword => setPassword(txtPassword)
        } />

      <Button
        style={{
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={signIn}
        disabled={isLoading}
      >
        {!isLoading ? <Text>Login</Text> : <Spinner color="#eeeeee" />}
      </Button>
      <Button
        transparent
        style={{
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={() => navigation.navigate('SignupScreen')}
        disabled={isLoading}
      >
        <Text>Signup</Text>
      </Button>
    </View>
  );
};
