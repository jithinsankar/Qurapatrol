import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Button, KeyboardAvoidingView } from 'react-native';
import *  as Animatable from 'react-native-animatable'

class mapwala extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reason: "",
        };
    }


    render() {
        return (
            <View style={styles.container} >

                <ImageBackground
                    style={{ flex: 1 }}
                    source={require('../../assets/ioswal.jpg')}

                >
                    <View style={styles.outertxt}>
                        <Animatable.View
                            style={styles.txt}
                            animation="zoomIn"
                            iterationCount={1}    >
                            <Text style={styles.boldText} >Track ME</Text>
                        </Animatable.View>
                    </View>

                    <KeyboardAvoidingView behavior={"padding"} style={{ backgroundcolor: 'white' }}>

                        <Animatable.View

                            animation="slideInUp"
                            iterationCount={1}    >


                            <View style={{
                                height: 300,
                                backgroundColor: 'white',

                            }}>
                                <View style={{

                                    paddingHorizontal: 25,
                                    marginTop: 25,



                                }}>
                                    <Text
                                        style={{ fontSize: 24 }}
                                    >Enter Details </Text>
                                </View>
                                <View style={{
                                    marginTop: 25,
                                    paddingHorizontal: 25,
                                    flexDirection: 'row'
                                }}>

                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                    }}>

                                        <TextInput

                                            value={this.state.reason}
                                            onChangeText={reason => this.setState({ reason: reason })}
                                            placeholder="Enter reason for going out"
                                        />

                                    </View>


                                </View>


                                <View style={styles2.box}>
                                    <TouchableOpacity style={styles2.inner} touchSoundDisabled={false} onPress={() => { this.props.navigation.navigate('bgloc', { reason: this.state.reason }); }}>
                                        <Text style={styles2.txt}>Continue</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles2.box}>
                                    <TouchableOpacity style={styles2.inner} touchSoundDisabled={false} onPress={() => this.props.navigation.navigate('HomeScreen')} >
                                        <Text style={styles2.txt}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>



                            </View>



                        </Animatable.View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        );
    }
}

export default mapwala;


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    outertxt: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    txt: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 100,
        width: 100,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 20,


    },

});

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
        flexDirection: "row",
        flexWrap: 'wrap',
        padding: 5,
        alignItems: 'center'
    },
    box: {

        width: '100%',
        height: '15%',
        //padding:30,
        paddingHorizontal: 20,
        marginTop: 10,

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
        fontWeight: 'bold',
        fontSize: 20
    }
})