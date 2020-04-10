import React from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';

import { auth } from '../config/firebase';

export default Home = ({ navigation }) => {
  const logout = () => {
    auth.signOut().then(() => navigation.navigate('AuthenticationScreen'));
  };
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 30
          }}>Menu</Text>
        </View>
      </View>

      {/*
    <View style={{ marginTop: 80, alignItems: 'center' }}>
      <View style={{ marginTop: 80, alignItems: 'center' }}>
        <Button style={{ marginTop: 20 }} onPress={logout} title="Logout" />
      </View>
      <View style={{ marginTop: 80, alignItems: 'center' }}>
        <Button style={{ marginTop: 20 }} onPress={() => navigation.navigate('Mapwala')} title="Navigate" />
      </View>
    </View>*/}
      <View style={styles.box}>
        <TouchableOpacity style={styles.inner} touchSoundDisabled={false} onPress={logout}>
          <AntDesign name="logout" size={32} color="white" />
          <Text style={styles.txt}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.inner} touchSoundDisabled={false} onPress={() => navigation.navigate('Mapwala')}>
          <Entypo name="location" size={32} color="white" />
          <Text style={styles.txt}>mark loc</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <TouchableOpacity style={styles.inner} touchSoundDisabled={false} onPress={() => Linking.openURL(`https://${"www.mygov.in/covid-19/"}`)}>
          <Entypo name="news" size={32} color="white" />
          <Text style={styles.txt}>COVID-19 Govt info</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.inner} touchSoundDisabled={false} onPress={() => Linking.openURL(`https://${"www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"}`)}>
          <FontAwesome5 name="hands-helping" size={32} color="white" />
          <Text style={styles.txt}>COVID-19 WHO advice</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.inner} touchSoundDisabled={false} onPress={() => Linking.openURL(`https://${"www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf"}`)}>
          <FontAwesome5 name="phone" size={32} color="white" />
          <Text style={styles.txt}>COVID-19 HelpLine Numbers</Text>
        </TouchableOpacity>
      </View>
    </View>





  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    flexDirection: "row",
    flexWrap: 'wrap',
    padding: 5,
    alignItems: 'center',

  },
  box: {

    width: '50%',
    height: '20%',
    //padding:30,
    paddingHorizontal: 20,
    marginTop: 40,

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
    //fontWeight: 'light',
    fontSize: 20,
    textAlign: 'center'
  },
  header: {
    width: '100%',
    height: '10%'
  }

})