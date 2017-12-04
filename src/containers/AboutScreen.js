import React, { Component } from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class AboutScreen extends Component {

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
                <Image style={styles.logoImage} 
                    resizeMode="contain" 
                    source={require('../images/ipoint_logo.png')} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Developed By i.Point LLC</Text>
                    </View>
            </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center'
  },
  logoImage: {
    flex: 0.4
  },
  titleContainer: {
    marginTop: 15, 
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold', 
    fontSize: 18
  }
});

export default AboutScreen;