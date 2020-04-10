import React, { useState } from 'react';

import { auth, db } from '../config/firebase';
import {
  Text, TextInput, Button, View, StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import *  as Animatable from 'react-native-animatable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default Signup = ({ navigation }) => {
  const [txtEmail, setEmail] = useState('');
  const [txtPassword, setPassword] = useState('');
  const [Name, setName] = useState('')
  const [Phone, setPhone] = useState('')
  const [isLoading, setLoading] = useState(false);
  const createAccount = () => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(txtEmail, txtPassword)
      .then(result => {
        if (result) {
          alert(
            'Account has been created. You will be automatically logged in.'

          );
          db.ref('/users/' + result.user.uid + '/userdetails').set({
            email: result.user.email,
            created_at: Date.now(),
            name: Name,
            Phone: Phone
          });
          navigation.goBack();
        }

        setLoading(false);
      })
      .catch(({ message }) => {
        alert(message);
        setLoading(false);
      });
  };
  return (

    <View style={styles.container}>
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
              height: 450,
              backgroundColor: 'white',

            }}>
              <View style={{

                paddingHorizontal: 25,
                marginTop: 25,



              }}>
                <Text
                  style={{ fontSize: 24 }}
                >Create new account</Text>
              </View>

              <TouchableOpacity>
                <View style={{
                  marginTop: 1,
                  paddingHorizontal: 25,
                  flexDirection: 'row'
                }}>

                  <View style={{
                    flexDirection: 'row',
                    flex: 1,
                  }}>

                    <TextInput
                      value={Name}
                      onChangeText={Name => setName(Name)}
                      placeholder="Enter Name"
                    />
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
                      value={Phone}
                      onChangeText={Phone => setPhone(Phone)}
                      placeholder="Enter Phone"
                      keyboardType='phone-pad'

                    />
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


                    <TextInput value={txtEmail} onChangeText={txtEmail => setEmail(txtEmail)} placeholder="Enter EmailId" />
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
                      value={txtPassword}
                      onChangeText={txtPassword => setPassword(txtPassword)}
                      placeholder="Enter Password"
                    />
                  </View>


                </View>


              </TouchableOpacity>



              <View style={styles2.box}>
                <TouchableOpacity style={styles2.inner} touchSoundDisabled={false} onPress={createAccount}>
                  <Text style={styles2.txt}>Create account</Text>
                </TouchableOpacity>
              </View>
              <View style={styles2.box}>
                <TouchableOpacity style={styles2.inner} touchSoundDisabled={false} onPress={() => navigation.goBack()} >
                  <Text style={styles2.txt}>Back to Login</Text>
                </TouchableOpacity>
              </View>





            </View>

            {/*}  <Button
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={createAccount}
            disabled={isLoading}
            title="Create account"
          />


          <Button
            transparent
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => navigation.goBack()}
            disabled={isLoading}
            title="Back to Login"
          />*/}

          </Animatable.View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
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