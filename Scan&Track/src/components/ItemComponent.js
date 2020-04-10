import React, { Component } from 'react';
import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  handleidPress = (data)=>{
    this.props.navigation.navigate('mapwala', {
      clientid :data
    });
   
}
  
  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index ) => {
          return (
            <View key={index}>
              <TouchableOpacity>
                <Text style={styles.itemtext} onPress={() =>{ this.handleidPress(item)}}>{item}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});