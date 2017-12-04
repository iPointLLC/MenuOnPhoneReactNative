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

class OrderSummary extends PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.personCountContainer}>
					<Text style={[styles.propertyText, styles.personCountTitleText]}>{I18n.t('personCount')}</Text>
					<CounterStepper
						stepperKey={this.props.dishKey}
						stepperValue={this.props.stepperValue}
						onCountChanged={this.props.orderPersonCountChanged}
					/>
				</View>
				{
					this.props.summaries && this.props.summaries.map((element, index) =>
						<View key={index}>
							<Text style={[styles.propertyText, styles.propertyTextMarginVertical]}>{element}.</Text>
						</View>
					)
				}
				<View style={styles.confirmButtonContainer}>
					<TouchableOpacity style={styles.confirmButton}>
						<Text style={styles.confirmButtonText}>{I18n.t('confirmOrder')}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 15, 
		padding: 15, 
		borderColor: 'red', 
		borderWidth: 1, 
		borderRadius: 6 
	},
	personCountContainer: {
		flexDirection: 'row', 
		alignItems: 'center'
	},
	personCountTitleText: {
		marginRight: 10
	},
	propertyText: {
		fontSize: 16, 
	},
	propertyTextMarginVertical: {
		marginVertical: 5
	},
	confirmButtonContainer: {
		height: 60, 
		alignItems: 'center', 
		justifyContent: 'center'
	},
	confirmButton: {
		borderRadius: 6, 
		backgroundColor: '#d64f6d'
	},
	confirmButtonText: {
		color: 'white', 
		fontWeight: 'bold', 
		marginHorizontal: 20, 
		marginVertical: 10
	}

});

export default OrderSummary;