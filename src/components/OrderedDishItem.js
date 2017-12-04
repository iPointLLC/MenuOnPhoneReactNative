import React, { PureComponent } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CounterStepper from './CounterStepper';
import I18n from '../i18n/i18n';

class OrderedDishItem extends PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.propertiesContainer}>
					<Text style={styles.indexText}>{this.props.index}. {this.props.name}</Text>
					<View style={styles.bottomContainer}>
						<View style={styles.propertyContainer}>
							<Text style={styles.propertyText}>{this.props.price} {I18n.t('rubles')} /</Text>
						</View>
						<View style={styles.propertyContainer}>
							<Text style={styles.propertyText}>{this.props.weight} {I18n.t('grams')}</Text>
						</View>
						<CounterStepper
							stepperKey={this.props.dishKey}
							stepperValue={this.props.stepperValue}
							onCountChanged={this.props.orderDishCountChanged}
						/>
					</View>
				</View>
				<View style={styles.removeButtonContainer}>
					<TouchableOpacity style={styles.removeButton} 
						onPress={ () => this.props.delecteIconPressed(this.props.dishKey) }>
						<Icon name='trash' size={30} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', 
		flex: 1
	},
	propertiesContainer: {
		flex: 1, 
		borderBottomColor: 'red', 
		borderBottomWidth: 1, 
		marginLeft: 10,
		paddingVertical: 10
	},
	bottomContainer: {
		flexDirection: 'row', 
		marginTop: 10, 
		alignItems: 'center'
	},
	propertyContainer: {
		marginRight: 5 
	},
	propertyText: {
		fontSize: 16
	},
	indexText: {
		fontSize: 18 
	},
	removeButtonContainer: {
		justifyContent: 'center'
	},
	removeButton: {
		paddingHorizontal: 10
	}

});

export default OrderedDishItem;