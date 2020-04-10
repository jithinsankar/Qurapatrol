import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { auth, db } from '../config/firebase';

let uid = ''

auth.onAuthStateChanged((user) => {
    if (user) {
        // User logged in already or has just logged in.
        uid = user.uid

        console.log(user.uid);
    } else {
        // User not logged in or has just logged out.
    }
});


let endtask = item => {


    auth.onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            db.ref('/users/' + user.uid + '/taskstatus').set({
                done: true
            });

            console.log(user.uid);
        } else {
            // User not logged in or has just logged out.
        }
    });



};




export default class qr extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }
    render() {
        return (
            <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                <QRCode
                    value={uid}
                    size={300}
                />


                <Text>{uid}</Text>
                <View style={{ marginTop: 30 }}>
                    <Button title="End task" onPress={() => { endtask(); alert("your task has been ended"); this.props.navigation.navigate('HomeScreen') }} ></Button>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',

        backgroundColor: '#ecf0f1',
    },
});
