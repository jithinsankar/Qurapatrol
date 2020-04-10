import React, { Component } from "react";
import { AsyncStorage, StyleSheet, View, Text, Button } from "react-native";
import MapView, { Marker, ProviderPropType } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import { auth, db } from '../config/firebase';

const LOCATION_TASK_NAME = "background-location-task";
const SPACE = 0.01;



let add_dest = (begn, dest, resn) => {
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
    console.log(begn);
    console.log(dest);
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            db.ref('/users/' + user.uid + '/destination').set({
                start_latitude: begn.latitude,
                start_longitude: begn.longitude,
                end_latitude: dest.latitude,
                end_longitude: dest.longitude,
                reason: resn
                /*  email: user.email*/
            });

            db.ref('/users/' + user.uid + '/taskstatus').set({
                done: false
            });
            console.log(user.uid);
        } else {
            // User not logged in or has just logged out.
        }
    });



};


let upd_live_loc = liveitem => {


    auth.onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            db.ref('/users/' + user.uid + '/livedata').set({
                live_latitude: liveitem.latitude,
                live_longitude: liveitem.longitude,

            });

            console.log(user.uid);
        } else {
            // User not logged in or has just logged out.
        }
    });



};


export default class bgloc extends Component {
    constructor(props) {
        super(props);
        const reason = props.navigation.getParam('reason');

        this.state = {
            region: null,
            error: '',
            a: {
                latitude: 0 + SPACE,
                longitude: 0 + SPACE,
            },
            b: {
                latitude: 0 + SPACE,
                longitude: 0 + SPACE,
            },
            reason: JSON.stringify(reason),
        };
    }

    _getLocationAsync = async () => {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            enableHighAccuracy: true,
            distanceInterval: 1,
            timeInterval: 5000
        });
        // watchPositionAsync Return Lat & Long on Position Change
        this.location = await Location.watchPositionAsync(
            {

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
                let a = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,

                };
                this.setState({ region: region, a: a, b: a });
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
                    initialRegion={this.state.region}
                    showsCompass={true}
                    showsUserLocation={true}
                    rotateEnabled={true}
                    ref={map => {
                        this.map = map;
                    }}
                    style={{ flex: 1 }}
                >
                    <Marker
                        coordinate={this.state.a}
                        draggable
                        onDragEnd={(e) => this.setState({ b: e.nativeEvent.coordinate })}
                    />

                </MapView>
                <View style={{ marginTop: 30, paddingHorizontal: 30, flex: 1 }}>
                    <View style={{ marginTop: 30, paddingHorizontal: 30, flex: 1 }}>
                        <Text>Drag red marker to the  required location</Text>
                    </View>
                    <View style={{ marginTop: 10, paddingHorizontal: 30, flex: 1 }}>
                        <Text> Latitude : {JSON.stringify(this.state.b.latitude)}</Text>
                        <Text> longitude : {JSON.stringify(this.state.b.longitude)}</Text>
                    </View>
                    <View style={{ marginTop: 10, paddingHorizontal: 30, flex: 1 }}>
                        <Button title="Continue" onPress={() => { this.props.navigation.navigate('qr'); add_dest(this.state.a, this.state.b, this.state.reason); }} ></Button>
                    </View>

                </View>

            </View>
        );
    }
}
bgloc.propTypes = {
    provider: ProviderPropType,
};

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
        console.log(error);
        return;
    }
    if (data) {
        const { locations } = data;
        let lat = locations[0].coords.latitude;
        let long = locations[0].coords.longitude;
        userId = (await AsyncStorage.getItem("userId")) || "none";
        console.log("Received new locations for user = ", userId, locations);
        // Storing Received Lat & Long to DB by logged In User Id
        /*
        axios({
          method: "POST",
          url: "http://000.000.0.000/phpServer/ajax.php",
          data: {
            action: "saveLocation",
            userId: userId,
            lat,
            long
          }
        });*/
        let liveitem = {
            latitude: lat,
            longitude: long,
        };
        upd_live_loc(liveitem);
        // console.log("Received new locations for user = ", userId, locations);
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});