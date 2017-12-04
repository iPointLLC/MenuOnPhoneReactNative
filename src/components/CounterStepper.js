import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class CounterStepper extends PureComponent {

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.leftStepper} onPress={ () => this.props.onCountChanged(-1, this.props.stepperKey)  }>
					<Icon name='minus' size={20} />
				</TouchableOpacity>
				<Text style={styles.innerText}>{this.props.stepperValue}</Text>
				<TouchableOpacity style={styles.rightStepper} onPress={ () => this.props.onCountChanged(1, this.props.stepperKey)  }>
					<Icon name='plus' size={20} />
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', 
		justifyContent: 'center', 
		alignItems: 'center',
		borderWidth: 1, 
		borderColor: '#d64f6d', 
		borderRadius: 6,
		paddingHorizontal: 5
	},
	leftStepper: {
		borderRightWidth: 1, 
		borderRightColor: '#d64f6d', 
		paddingRight: 5
	},
	innerText: {
		marginHorizontal: 10
	},
	rightStepper: {
		borderLeftWidth: 1, 
		borderLeftColor: '#d64f6d', 
		paddingLeft: 5
	}
});

export default CounterStepper;