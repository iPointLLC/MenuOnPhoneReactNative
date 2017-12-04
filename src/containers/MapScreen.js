import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Button, 
    StyleSheet, 
    Text, 
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Image
  } from 'react-native';
  import MapView from 'react-native-maps';
  import Icon from 'react-native-vector-icons/FontAwesome';

class MapScreen extends Component {

  static navigationOptions = (options) => ({
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#d64f6d' },
        headerBackTitle: null,
        headerLeft: (
                <TouchableOpacity onPress={() => {
                    options.screenProps.openDrawer()
                }}>
                    <Icon name='bars' size={30} color='white' />
                </TouchableOpacity>
            )
    })

	render() {
		return (
			<View style={styles.container}>
				<MapView style={styles.map} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});



export default MapScreen;