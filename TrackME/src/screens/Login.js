import React, { useState } from 'react';

import { StyleSheet, Text, ImageBackground, TextInput, View, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { auth } from '../config/firebase';
import *  as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

    <ImageBackground
      style={{ flex: 1 }}
      source={require('../../assets/ioswal.jpg')}

    >

      <View style={styles.outertxt}>
        <Animatable.View
          style={styles.txt}
          animation="zoomIn"
          iterationCount={1}    >
          <Text style={styles.boldText} >Track Me</Text>
        </Animatable.View>
      </View>
      <KeyboardAvoidingView behavior={"padding"} style={{ backgroundcolor: 'white' }}>
        <Animatable.View

          animation="slideInUp"
          iterationCount={1}    >


          <View style={{
            height: 350,
            backgroundColor: 'white',

          }}>
            <View style={{

              paddingHorizontal: 25,
              marginTop: 25,



            }}>
              <Text
                style={{ fontSize: 24 }}
              >Log in to your account </Text>
            </View>

            <TouchableOpacity>
              <View style={{
                marginTop: 25,
                paddingHorizontal: 25,
                flexDirection: 'row'
              }}>

                <View style={{
                  flexDirection: 'row',
                  flex: 1,
                }}>


                  <TextInput style={{ flex: 1, fontSize: 20 }} placeholder="Enter Email" value={txtEmail} onChangeText={txtEmail => setEmail(txtEmail)} />
                </View>


              </View>
              <View style={{
                marginTop: 25,
                paddingHorizontal: 25,
                flexDirection: 'row'
              }}>

                <View style={{
                  flexDirection: 'row',
                  flex: 1,
                }}>

                  <TextInput
                    secureTextEntry
                    placeholder="Enter Password"
                    value={txtPassword}
                    onChangeText={txtPassword => setPassword(txtPassword)
                    } />
                </View>


              </View>



            </TouchableOpacity>


            <View style={styles2.box}>
              <TouchableOpacity style={styles2.inner} touchSoundDisabled={false} onPress={signIn}>
                <Text style={styles2.txt}>Sign In</Text>
              </TouchableOpacity>
            </View>
            <View style={styles2.box}>
              <TouchableOpacity style={styles2.inner} touchSoundDisabled={false} onPress={() => {auth.signOut();navigation.navigate('Signup_phone')}} >
                <Text style={styles2.txt}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </View>
          {/*}


          <Button
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',

            }}
            onPress={signIn}
            disabled={isLoading}
            title="Login"
          />

          <Button
            transparent
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => navigation.navigate('SignupScreen')}
            disabled={isLoading}
            title="SignUp"
          />


          */}
        </Animatable.View>
      </KeyboardAvoidingView>
    </ImageBackground >


  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  outertxt: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

  txt: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 100,
    width: 100,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,


  },

});


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    flexDirection: "row",
    flexWrap: 'wrap',
    padding: 5,
    alignItems: 'center'
  },
  box: {

    width: '100%',
    height: '15%',
    //padding:30,
    paddingHorizontal: 20,
    marginTop: 10,

  },
  inner: {
    flex: 1,
    backgroundColor: '#2637f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  txt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
})