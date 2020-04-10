
import { auth ,db } from '../config/firebase';

import React, { useState, useEffect ,Component } from 'react';
import { Text, View, StyleSheet, Button , AsyncStorage} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
const STORAGE_KEY = '@IDS'
export default function qrscanscreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  //////////////////////////////////////////////////////
  //const [uid, setUid] = useState("initialState")
  
   
 

const  save = async name => {
    try {
      /*
      var ids = AsyncStorage.getItem(STORAGE_KEY);
      ids = JSON.parse(ids);
      ids.push(name);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      console.log('Saved');
*/


      AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
        const id = [name];
        if (result !== null) {
          console.log('Data Found', result);
          var newIds = JSON.parse(result).concat(id);
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
        } else {
          console.log('Data Not Found');
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(id));
        }
      });


     // this.setState({ name })
    } catch (e) {
      console.log('Failed to save name.')
    }
  }
/*
  removeEverything = async () => {
    try {
      await AsyncStorage.clear()
      alert('Storage successfully cleared!')
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }*/
  //////////////////////////////////////////////////////

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })(); 
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
   
    console.log(data.length);
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
   
   // retrieveData();


     


    if( data.length == 28)
    {  save(data);
      alert(` id : ${data} has been scanned!`);
      navigation.navigate('mapwala', {
      clientid :data
    });

    }
    else
    { alert('invalid qr code!')
      console.log("error");

    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}
