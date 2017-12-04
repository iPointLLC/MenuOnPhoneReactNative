import React, { Component } from 'react';
import {
	View, 
	Text,
	TouchableOpacity,
	SectionList,
	Image,
	Alert,
	TextInput,
	StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions';
import Icon from "react-native-vector-icons/FontAwesome";
import _ from 'lodash';
import I18n from '../i18n/i18n';
import MenuListItem from '../components/MenuListItem';

class RestaurantMenuScreen extends Component {

	constructor(props) {
		super(props);
		this.handleBackButtonTapped = this.handleBackButtonTapped.bind(this);
		this.handleItemTapped = this.handleItemTapped.bind(this);
		this.renderHeader = this.renderHeader.bind(this);
		this.state = {
			dataSource: [],
			searchText: ''
		}
	}

	componentWillMount() {
		this.props.navigation.setParams({ handleBack: this.handleBackButtonTapped });
	}

	componentDidMount() {
		const { key } = this.props.navigation.state.params;
		this.props.actions.initOrder(key);
		this.props.actions.getDishes(key);

	}

	componentWillReceiveProps(nextProps) {
		const navigation = this.props.navigation;
		if (this.state.dataSource.length === 0 && nextProps.allDishes && nextProps.allDishes.length > 0) {
			let dataSource = this.getInitialDataSource(nextProps.allDishes);
			this.setState({
				dataSource
			});
		} else if (this.props.orderedDishes !== nextProps.orderedDishes) {
			const dishes = nextProps.orderedDishes;
			navigation.setParams({ dishes });
		}
	}

	static navigationOptions = ({ navigation }) => ({
  		title: I18n.t('menu'),
  		tabBarVisible: false,
  		headerLeft: (
  			<TouchableOpacity onPress={ () => navigation.state.params.handleBack() }>
  				<Icon name={'angle-left'} size={35} color='white' style={styles.backButtonIcon} />
  			</TouchableOpacity>
  		),
  		headerRight: (
    		<TouchableOpacity style={styles.orderBarButton}
    					onPress={() => { 
    						if (navigation.state && 
    							navigation.state.params &&
    							navigation.state.params.dishes &&
    							navigation.state.params.dishes.length > 0) {
    								navigation.navigate('Order') 
    						} else {
    							Alert.alert(I18n.t('invalid'), I18n.t('emptyOrder'))
    						}
    					}}>
      			<Text style={styles.orderBarButtonText}>{I18n.t('order')}</Text>
    		</TouchableOpacity>
  		)
	});

	getInitialDataSource(allDishes) {
    	if (allDishes && allDishes.length > 0) {
			let dataSource = _.groupBy(allDishes, dishObject => dishObject.dish.type);
			dataSource = _.reduce(dataSource, (result, value, index) => {
				result.push({
					key: I18n.t(index),
					data: value
				});
				return result;
			}, []);
			return dataSource;
		}
    }

	handleBackButtonTapped() {
		if (this.props.orderedDishes && this.props.orderedDishes.length > 0) {
			Alert.alert(
				I18n.t('cancelOrderAlertTitle'),
				I18n.t('cancelOrderAlertText'),
				[
					{ text: I18n.t('cancel'), style: 'cancel' },
					{ text: I18n.t('ok'), onPress: () => {
						this.props.actions.orderCancelled();
						this.props.navigation.goBack();
					}},
				],
				{ cancelable: false }
			);
		} else {
			this.props.navigation.goBack();
		}
	}

	handleItemTapped(item) {
		const { orderedDishes } = this.props;
		const index = orderedDishes.indexOf(item);
		if(index != -1) {
			orderedDishes.splice(index, 1);
		} else {
			orderedDishes.push(item);
		}
		const newDishes = [ ...orderedDishes ]
		this.props.actions.orderDishesChanged(newDishes);
	}

	renderSeparator() {
		return (
    		<View style={styles.separatorStyle}/>
    	);
	}

	renderSectionHeader = (headerItem) => {
		return (
			<View style={styles.sectionHeader}>
				<Text>{headerItem.section.key}</Text>
			</View>
		);
	}

	onChangeText(text) {
		let filteredDataSource = [];
		filteredDataSource = _.reduce(this.getInitialDataSource(this.props.allDishes), (result, value, index) => {
			const key = value.key;
			const array = value.data;
      		const filteredArray = _.filter(array, (item) => {
      			const result = item.dish.name[this.props.preferredLang].trim().toLowerCase().includes(text.trim().toLowerCase());
      			return result;
      		});
      		if (filteredArray.length > 0) {
      			result.push({
      				key,
					data: filteredArray
      			});	
      		} 
			return result;
		}, []);

		if (filteredDataSource.length === 0) {
			filteredDataSource.push({
				key: I18n.t('nothingIsFound'),
				data: []
			})
		}
    	this.setState({
      		searchText: text,
      		dataSource: filteredDataSource
    	});
  	}

	renderHeader() {
    	return(
      		<View style={styles.searchContainer}>
      			<Icon name='search' size={30} style={styles.searchIcon}/>
        		<TextInput
            		style={styles.searchTextInput}
            		onChangeText={(text) => this.onChangeText(text)}
            		placeholder={I18n.t('typeTextForSearch')}
            		clearButtonMode='while-editing'
            		value={this.state.searchText}
            		autoCorrect={false}
            		autoCapitalize='none'
      			/>
      		</View>
    	);
  	};

  	getIsItemSelected(item) {
  		const { orderedDishes } = this.props; 
		const index = orderedDishes.indexOf(item);
		return ((index !== -1) ? true : false);
  	}

	renderItem = ({item}) => {
		return (
			<MenuListItem 
				item={item} 
				lang={this.props.preferredLang} 
				onPress={this.handleItemTapped}
				isSelected={this.getIsItemSelected(item)}
			/>
		);
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<SectionList renderItem={this.renderItem}
					renderSectionHeader={this.renderSectionHeader}
					sections={this.state.dataSource}
					ItemSeparatorComponent={this.renderSeparator}
					keyExtractor={(item) => item.key}
					ListHeaderComponent={this.renderHeader} 
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	backButtonIcon: {
		marginLeft: 10, 
		marginRight: 15, 
		marginVertical: 5
	},
	orderBarButton: {
		borderWidth: 1, 
		borderRadius: 6, 
		borderColor: 'white', 
		paddingHorizontal: 10, 
		paddingVertical: 5
	},
	orderBarButtonText: {
		color: 'white'
	},
	separatorStyle: {
		height: 1,
		backgroundColor: "#CED0CE",
	},
	sectionHeader: {
		backgroundColor: 'lightgray', 
		padding: 10
	},
	searchTextInput: {
		height: 40, 
		flex: 1
	},
	searchIcon: {
		marginLeft: 10, 
		marginRight: 10
	},
	searchContainer: {
		flexDirection: 'row', 
		marginTop: 10, 
		borderBottomColor: '#CED0CE', 
		borderWidth: 1, 
		borderColor: 'transparent'
	}
})

const mapStateToProps = (state) => {
	const allDishes = state.dishes.dishes;
	const orderedDishes = state.order.dishes;
	const preferredLang = state.app.settings.preferredLang;
	return {
		allDishes,
		orderedDishes,
		preferredLang
	};
};

const mapDispatchToProps = (dispath) => ({
	actions: bindActionCreators(ActionCreators, dispath)
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenuScreen);