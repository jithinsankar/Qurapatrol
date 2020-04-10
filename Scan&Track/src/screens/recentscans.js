
import React, { Component } from 'react';
import { View, Text, StyleSheet , AsyncStorage} from 'react-native';
import ItemComponent from '../components/ItemComponent';


const STORAGE_KEY = '@IDS'

export default class List extends Component {
  state = {
    items: []
  };

 

  componentDidMount() {
   
  
      AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
        if (result !== null) {
          console.log('Data Found', result);
          console.log(JSON.parse(result));
          this.setState({items :JSON.parse(result)})
          console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
          console.log(this.state.items)
        } else {
          console.log('Data Not Found');
         
        }
      });

  

  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} navigation={this.props.navigation} />
        ) : (
          <View style={styles2.container}>
          <View style={styles2.box}>
          <Text style={styles2.txt}>No items</Text>
          </View>
          </View>
        )}
      </View>
 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  }
});

const styles2 = StyleSheet.create({
  container:{
   // flex:1,
    marginTop:70  ,
    flexDirection:"row",
    flexWrap:'wrap',
    padding:5,
    alignItems:'center',
    justifyContent:'center'
  },
  box:{
    
   
    //padding:30,
  alignItems:'center',
  justifyContent:'center',
  alignContent:'center'
  
  },

  txt:{
   // color:'white',
    fontWeight:'bold',
    fontSize:20
  }
})