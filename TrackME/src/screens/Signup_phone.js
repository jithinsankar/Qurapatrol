import React, { useRef, useState } from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import styles from '../styles/styles'
import { firebaseConfig, firebase } from '../config/firebase'

export default Signup_phone = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');


  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId).catch(function (error) {
        alert(error);
        alert("Enter Country Code [+91]")
      });;
    alert("Check your Messages for OTP")
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        console.log(result, "signed in...");
        navigation.navigate("AuthenticationScreen")

      });
  };




  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View>

        <View style={{ alignItems: 'center' }}>
          <Text>OTP Verification</Text>
        </View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />


        <TextInput
          placeholder="+91-Enter Phone Number"
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoCompleteType="tel"
          style={styles.textInput}
        />

        <TouchableOpacity
          style={styles.sendVerification}
          onPress={sendVerification}
        >
          <Text style={styles.buttonText}>Send Verification</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Confirmation Code"
          onChangeText={setCode}
          keyboardType="number-pad"
          style={styles.textInput}
        />

        <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
          <Text style={styles.buttonText}>Send Code</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView >
  );
};
