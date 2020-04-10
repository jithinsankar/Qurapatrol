import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, ProviderPropType } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { auth , db } from '../config/firebase';

export default class mapwala extends Component {
  constructor(props) {
    super(props);
    //const clientid  = props.navigation.getParam('clientid', '');
    
    const clientid  = 'nDnihC6mSYMhCc3M85du4p1Mo2E3';
    let a ={
      latitude: 0,
      longitude: 0,
    }
    let b ={
      latitude: 0,
      longitude: 0,
    }
    
    db.ref('/users/'+clientid)
    .on('value', snapshot => {
        let data = snapshot.val();
        console.log(data)
        a ={
          latitude: data.destination.start_latitude,
          longitude: data.destination.start_longitude,
        }
        b ={
          latitude: data.destination.end_latitude,
          longitude: data.destination.end_longitude,
        }
        
      });


    this.state = {
      region: null,
      error: '',
       a: a,
       b: b,
     // clientid: JSON.stringify(clientid),
     clientid:clientid,
    };
    console.log(this.state.a.latitude + this.state.b.latitude)
    console.log(this.state.clientid)
    

  }
 

  _getLocationAsync = async () => {
    /*await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      enableHighAccuracy: true,
      distanceInterval: 1,
      timeInterval: 5000
    });*/
    // watchPositionAsync Return Lat & Long on Position Change
    this.location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000
      },
      newLocation => {
        let { coords } = newLocation;
        // console.log(coords);
        let region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045
        };
        this.setState({ region: region });
      },
      error => console.log(error)
    );
    return this.location;
  };

  async componentWillMount() {
    // Asking for device location permission
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      this._getLocationAsync();
    } else {
      this.setState({ error: "Locations services needed" });
    }
    userId = (await AsyncStorage.getItem("userId")) || "none";
    userName = (await AsyncStorage.getItem("userName")) || "none";
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          
          region={this.state.b}
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={true}
          ref={map => {
            this.map = map;
          }}
          style={{ flex: 1 }}
        >
            <Marker coordinate={this.state.a}  title= "start"/>
            <Marker coordinate={this.state.b} pinColor="green" title= "end" />
        </MapView>
      </View>
    );
  }
}
mapwala.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});