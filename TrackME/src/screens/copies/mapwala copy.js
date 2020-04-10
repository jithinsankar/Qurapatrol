import { auth, db } from '../config/firebase';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Button,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;



let addItem = item => {


    auth.onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            db.ref('/users/' + user.uid).set({
                latitude: item.latitude,
                longitude: item.longitude,
                email: user.email
            });

            console.log(user.uid);
        } else {
            // User not logged in or has just logged out.
        }
    });



};


Location.Accuracy = 6;
function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

class DefaultMarkers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasLocationPermissions: false,
            locationResult: null,
            region: null,
            markers: [],
            a: {
                latitude: 0 + SPACE,
                longitude: 0 + SPACE,
            },
            b: {
                latitude: 0 + SPACE,
                longitude: 0 + SPACE,
            },
        };
    }


    componentDidMount() {
        this.getLocationAsync();
    }

    handleMapRegionChange = mapRegion => {
        this.setState({ region });
    };

    async getLocationAsync() {
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        const { status, permissions } = await Permissions.askAsync(
            Permissions.LOCATION
        );
        if (status === 'granted') {
            this.setState({ hasLocationPermissions: true });

            //  let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            this.setState({ locationResult: JSON.stringify(location) });
            // Center the map on the location we just fetched.
            this.setState({
                region: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }, markers: [],
                a: {
                    latitude: location.coords.latitude + SPACE,
                    longitude: location.coords.longitude + SPACE,
                },
                b: {
                    latitude: location.coords.latitude + SPACE,
                    longitude: location.coords.longitude + SPACE,
                },

            });
        } else {
            alert('Location permission not granted');
        }
    };
















    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={this.state.region}
                    onPress={e => this.onMapPress(e)}
                >
                    <Marker
                        coordinate={this.state.a}
                        draggable
                        onDragEnd={(e) => this.setState({ b: e.nativeEvent.coordinate })}
                    />

                    <Marker coordinate={this.state.a}></Marker>
                </MapView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => this.setState({ markers: [] })}
                        style={styles.bubble}
                    >
                        <Text>Drag your marker to the  specified position {JSON.stringify(this.state.b)}</Text>
                        <Button title="Continue" onPress={() => { this.props.navigation.navigate('bgloc'); /*addItem(this.state.b); */ }} ></Button>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

DefaultMarkers.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        /*...StyleSheet.absoluteFillObject,*/
        width: width,
        height: height,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});

export default DefaultMarkers;


