import React, { Component } from 'react';
import {
	View, 
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	Alert,
	StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationActions } from 'react-navigation'; 
import I18n from '../i18n/i18n';
import { ActionCreators } from '../redux/actions';
import OrderedDishItem from '../components/OrderedDishItem';
import OrderSummary from '../components/OrderSummary';

class OrderScreen extends Component {

	constructor(props) {
		super(props);
		this.delecteIconPressed = this.delecteIconPressed.bind(this);
		this.orderDishCountChanged = this.orderDishCountChanged.bind(this);
		this.orderPersonCountChanged = this.orderPersonCountChanged.bind(this);
	}

	componentWillMount() {
		this.props.navigation.setParams({ handleSave: this.saveOrderToServer.bind(this) });
    }

    componentWillReceiveProps(nextProps) {
		if (nextProps.dishes.length === 0) {
			this.props.navigation.goBack();
		}
    }

	saveOrderToServer() {
		const orderToSave = {};
    	orderToSave.dishes = this.props.dishes;
    	orderToSave.personCount = this.props.personCount;
    	orderToSave.countTable = this.props.countTable;
    	orderToSave.restaurantId = this.props.restaurantId;
    	this.props.actions.saveOrderToServer(orderToSave);
	}

	static navigationOptions = ({ navigation }) => ({
  		title: I18n.t('order'),
  		tabBarVisible: false,
  		headerRight: (
    		<TouchableOpacity style={styles.saveBarButton}
    					onPress={() => navigation.state.params.handleSave()}>
      			<Text style={{ color: 'white' }}>{I18n.t('save')}</Text>
    		</TouchableOpacity>
  		)
	});

	calculateSummaryPriceWithTips() {
		const priceWithTips = this.calculateSummaryPrice() + this.calculateSummaryPrice() * 0.1;
		return priceWithTips;
	}

	calculatePriceForDish(key) {
		for (let dish of this.props.dishes) {
			if (key === dish.key) {
				const itemPrice = dish.dish.price;
				const count = this.props.countTable[key];
				if (count) {
					const dishPrice = itemPrice * count;
					return dishPrice;
				}
			}
		}
	}

	calculateWeightForDish(key) {
		for (let dish of this.props.dishes) {
			if (key === dish.key) {
				const itemWeight = dish.dish.weight;
				const count = this.props.countTable[key];
				if (count) {
					const dishWeight = itemWeight * count;
					return dishWeight;
				}
			}
		}
	}

	calculateSummaryPrice() {
		const summary = _.reduce(this.props.dishes, (sum, dish) => {
			let count = this.props.countTable[dish.key];
			if (!count) {
				count = 1;
			};
  			return (sum + (dish.dish.price * count));
		}, 0);
		return summary;
	}

	calculateSummaryWeight() {
		const summary = _.reduce(this.props.dishes, (sum, dish) => {
			let count = this.props.countTable[dish.key];
			if (!count) {
				count = 1;
			};
  			return (sum + (dish.dish.weight * count));
		}, 0);
		return summary;
	}

	calculateSummaryDishesCount() {
		const summary = _.reduce(this.props.countTable, (sum, value, key) => {
  			return (sum + value);
		}, 0);
		return summary;
	}

	orderPersonCountChanged(byValue) {
		const personCount = this.props.personCount;
		const newValue = personCount + byValue;
		if (newValue > 0 && newValue <= 100) {
			this.props.actions.orderPersonCountChanged(newValue);
		}
	}

	orderDishCountChanged(byValue, dishKey) {
		const countTable = this.props.countTable;
		const newValue = countTable[dishKey] + byValue;
		if (newValue > 0 && newValue <= 100) {
			const newCountTable = { ...countTable, [dishKey]: newValue  }
			this.props.actions.orderDishCountChanged(newCountTable);
		}
	}

	deleteDishFromOrder(key) {
		this.props.actions.orderDishRemoved(key);
	}

	delecteIconPressed(key) {
		Alert.alert(
  			I18n.t('deleteDishAlertTtile'),
  			I18n.t('deleteDishAlertText'),
  			[
    			{ text: I18n.t('cancel'), style: 'cancel' },
    			{ text: I18n.t('ok'), onPress: () => this.deleteDishFromOrder(key) },
  			],
  			{ cancelable: false }
		)
	}

	getSummaries() {
		const dishesCount = this.calculateSummaryDishesCount(); 
		const dishesCountStr = I18n.t('dishesCount') + ': ' + dishesCount + ' ' + I18n.t('pieces');
		const summaryPrice = this.calculateSummaryPrice();
		const summaryPriceStr = I18n.t('summaryPrice') + ': ' + summaryPrice + ' ' + I18n.t('rubles');
		const summaryPriceWithTips = this.calculateSummaryPriceWithTips();
		const dsummaryPriceWithTipsStr = I18n.t('summaryPriceWithTips') + '(10%): ' + summaryPriceWithTips + ' ' + I18n.t('rubles');
		return [dishesCountStr, summaryPriceStr, dsummaryPriceWithTipsStr];
	}


	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
					{
						this.props.dishes.map((element, index) =>
							<OrderedDishItem
								key={element.key}
								dishKey={element.key}
								index={index + 1} 
								name={element.dish.name[this.props.preferredLang]}
								price={this.calculatePriceForDish(element.key)}
								weight={this.calculateWeightForDish(element.key)}
								delecteIconPressed={this.delecteIconPressed}
								stepperValue={this.props.countTable[element.key]}
								orderDishCountChanged={this.orderDishCountChanged}
							/>
						)
					}
					<OrderSummary
						orderPersonCountChanged={this.orderPersonCountChanged}
						stepperValue={this.props.personCount}
						summaries={this.getSummaries()}
					/>
				</ScrollView>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	saveBarButton: {
		borderWidth: 1, 
		borderRadius: 6, 
		borderColor: 'white', 
		paddingHorizontal: 10, 
		paddingVertical: 5
	},
});

const mapStateToProps = (state) => {
  const { order, app } = state;
  const { preferredLang } = app.settings;
  const { dishes, sum, personCount, countTable, restaurantId, isOrderChanged } = order;
  return {
  	isOrderChanged,
    dishes,
    sum,
    personCount,
    countTable,
    restaurantId,
    preferredLang
  };
};

const mapDispatchToProps = (dispath) => ({
  actions: bindActionCreators(ActionCreators, dispath)
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);