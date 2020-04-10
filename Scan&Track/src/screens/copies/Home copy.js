import React from 'react';
import { Button, View ,AsyncStorage } from 'react-native';

import { auth } from '../config/firebase';

export default Home = ({ navigation }) => {
  const logout = () => {
    auth.signOut().then(() => navigation.navigate('AuthenticationScreen'));
  };

 

const  removeItemValue = async key => {
  try {
    await AsyncStorage.removeItem(key);

  } catch (e) {
    console.log('Failed to clear.')
  }
}









  
  return (
    <View style ={{flex:1,marginTop:70  ,alignItems:'center'}}>
      <View style ={{marginTop:70}}>
        <Button style={{ }} onPress={logout} title="Logout" />
      </View>
      <View style ={{marginTop:10}}>
        <Button style={{ }} rounded onPress={() =>{ navigation.navigate('qrscanscreen'),console.log("pressed")}} title="Scan qr" />
      </View>
      <View style ={{marginTop:10}}>
       <Button style={{  }} onPress={() =>{ navigation.navigate('recentscans'),console.log("pressed")}} title="Recent" />
      </View>
      <View style ={{marginTop:10}}>
        <Button style={{  }} onPress={() =>{  removeItemValue('@IDS'),alert('ids successfully cleared!') }} title="Clear recent" />
      </View>
    </View>


  );
};
