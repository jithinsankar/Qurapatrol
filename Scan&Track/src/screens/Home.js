import React from 'react';
import { Button, View ,AsyncStorage ,Text ,StyleSheet ,TouchableOpacity} from 'react-native';

import { auth } from '../config/firebase';
import { Ionicons ,MaterialIcons,AntDesign} from '@expo/vector-icons';

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
    
    <View style ={styles.container}>

      <View style={styles.header}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontWeight:'bold',
        fontSize:30}}>Menu</Text>
        </View>
      </View>
     {/* <View style ={{marginTop:70}}>
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
  </View>*/}
  
      <View style={styles.box}>
          <TouchableOpacity style = {styles.inner} touchSoundDisabled ={false} onPress={logout}>
             <AntDesign name="logout" size={32} color="white" />
             <Text style={styles.txt}>Logout</Text>
          </TouchableOpacity>  
      </View>
      <View style={styles.box}>
      <TouchableOpacity style = {styles.inner} touchSoundDisabled ={false} onPress={() =>{ navigation.navigate('qrscanscreen'),console.log("pressed")}}>
        <AntDesign name="qrcode" size={32} color="white" />
          <Text style={styles.txt}>Scan qr</Text>
          </TouchableOpacity>  
      </View>
      <View style={styles.box}>
      <TouchableOpacity style = {styles.inner} touchSoundDisabled ={false} onPress={() =>{ navigation.navigate('recentscans'),console.log("pressed")}}>
        <AntDesign name="back" size={32} color="white" />
        <Text style={styles.txt}>Recent</Text>
          </TouchableOpacity>  
      </View>
      <View style={styles.box}>
        <TouchableOpacity style = {styles.inner} touchSoundDisabled ={false} onPress={() =>{  removeItemValue('@IDS'),alert('ids successfully cleared!') }}>
        <MaterialIcons name="layers-clear" size={32} color="white" />
          <Text style={styles.txt}>Clear recent</Text>
          </TouchableOpacity>  
      </View>
    
      </View>
    
   



  );
};

const styles = StyleSheet.create({
      container:{
        flex:1,
        marginTop:40  ,
        flexDirection:"row",
        flexWrap:'wrap',
        padding:5,
        alignItems:'center',
      
      },
      box:{
        
        width:'50%',
        height:'20%',
        //padding:30,
        paddingHorizontal:20,
        marginTop:40,
      
      },
      inner:{
        flex:1,
        backgroundColor:'#2637f0',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
      },
      txt:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
      },
      header:{
        width:'100%',
        height:'10%'
      }
    
})