import React, { Component } from "react";
import { StyleSheet, View ,Text , TouchableOpacity ,Linking} from "react-native";
import MapView, { Marker, ProviderPropType } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { auth , db } from '../config/firebase';

export default class mapwala extends Component {
  constructor(props) {
    super(props);
    const clientid  = props.navigation.getParam('clientid');
    
    //const clientid  = 'nDnihC6mSYMhCc3M85du4p1Mo2E3';
    console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
    console.log(clientid);



    this.state = {
      region: {
        latitude: 11,
        longitude: 75,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045
      },
      error: '',
          a:  { latitude:  0,
                longitude: 0},
          b:  { latitude:  0,
                longitude: 0},
          c:  { latitude:  0,
                longitude: 0},
         // clientid:clientid, 
          
      clientid: JSON.stringify(clientid),
      emailid:'',
      Phone:'',
      name:'',
      reason:'',
     
    };
    
    

  }
 componentDidMount(){
  console.log("000000000000000000000000");
  console.log(this.state.clientid)

  db.ref('/users/'+this.state.clientid.replace(/^"(.+(?="$))"$/, '$1'))
  .on('value', snapshot => {
      let data = snapshot.val();
      console.log(data)
      let a = {
        latitude: data.destination.start_latitude,
        longitude: data.destination.start_longitude

    };
      let b = {
        latitude: data.destination.end_latitude,
        longitude: data.destination.end_longitude,
      };

      let c = {
        latitude: data.livedata.live_latitude,
        longitude: data.livedata.live_longitude,
      };
      console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
      console.log(a);

      let emailid = data.userdetails.email;
      let Phone = data.userdetails.Phone;
      let name = data.userdetails.name;
      let reason = data.destination.reason;
      this.setState({ a: a, b: b , c:c , emailid:emailid , Phone : Phone , name:name , reason:reason}); 
      
        console.log(this.state.a)
      
    });
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
            <Marker coordinate={this.state.c} pinColor="blue" title= "live" />
        </MapView>{/*
        <View style={{marginTop:10 ,flex:1,alignItems:'center',justifyContent:'center'}}>
          <View >
            <Text>email:{this.state.emailid}</Text>
            <Text>Phone:{this.state.Phone}</Text>
            <Text>Name:{this.state.name}</Text>
            <Text>Reason:{this.state.reason}</Text>
          </View>
        </View>*/}
        <View style={{marginTop:10 ,flex:1,alignItems:'center',justifyContent:'center'}}>
           <View style={styles2.box}>
             <View style ={styles2.inner}>
                <Text style={styles2.txt}>Name: {this.state.name}</Text>
              </View>
           </View>
           <View style={styles2.box}>
              <TouchableOpacity style ={styles2.inner} onPress={() => Linking.openURL(`mailto:${this.state.emailid}`)}>
                <Text style={styles2.txt}>email: {this.state.emailid}</Text>
              </TouchableOpacity>
           </View>
           <View style={styles2.box}>
             <TouchableOpacity style ={styles2.inner} onPress={() => Linking.openURL(`tel:${this.state.Phone}`)}>
                <Text style={styles2.txt}>Phone: {this.state.Phone}</Text>
              </TouchableOpacity>
           </View>
           <View style={styles2.box}>
             <View style ={styles2.inner}>
                <Text style={styles2.txt}>Reason: {this.state.reason}</Text>
              </View>
           </View>
      </View>
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

const styles2 = StyleSheet.create({
  container:{
    flex:1,
    marginTop:70  ,
    flexDirection:"row",
    flexWrap:'wrap',
    padding:5,
    alignItems:'center'
  },
  box:{
    
    width:'100%',
    height:'15%',
    //padding:30,
    paddingHorizontal:20,
    marginTop:10,
  
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
  }
})