import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Button, 
    Text, 
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { List, ListItem, SearchBar } from "react-native-elements";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { ActionCreators } from '../redux/actions';
import * as firebaseUtils from '../firebase/firebaseUtils';
import RestaurantListItem from '../components/RestaurantListItem';
import I18n from '../i18n/i18n';
import firebase from 'firebase';

class RestaurantListScreen extends Component { 

    static navigationOptions = (options) => ({
        headerMode: 'screen',
        headerTintColor: 'white',
        headerBackTitle: null,
        headerLeft: (
                <TouchableOpacity onPress={() => {
                    options.screenProps.openDrawer()
                }}>
                    <Icon name='bars' size={30} color='white' />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity onPress={() => { options.navigation.navigate('QRCodeScanner') }}>
                    <Icon name='qrcode' size={30} color='white' style={styles.qrCodeIcon} />
                </TouchableOpacity>
            )
    })

    constructor(props) {
        super(props);
        this.state = {
            restaurants: this.props.restaurants,
            searchText: ''
        };
        this.renderHeader = this.renderHeader.bind(this);
    }

    componentDidMount() {
        // const user = firebase.auth().currentUser;
        // if (user) {
            this.props.actions.getRestaurants();
        // } else {
        //     this.props.actions.signInWithEmailAndPassword("dev@ipoint.ru", "devipointru", () => {
        //         this.props.actions.getRestaurants();
        //     })
        // }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.restaurants !== nextProps.restaurants) {
            this.setState({
                restaurants: nextProps.restaurants,
                searchText: ''
            });
        }
    }

    onRestaurantPress = (restaurant, key) => {
        this.props.navigation.navigate('RestaurantDetails', { restaurant: restaurant, key: key });
    }

    getFormattedCuisineList = (cuisineArray) => {
        return cuisineArray.join(", ");
    }

    renderSeparator = () => {
        return (
            <View style={styles.separator}/>
        );
    }

    onChangeText(text) {
        const filteredRestaurants = _.filter(this.props.restaurants, (restaurantObject) => {
            const restaurant = restaurantObject.restaurant;
            const result = restaurant.name[this.props.preferredLang].trim().toLowerCase().includes(text.trim().toLowerCase());
            return result;
        });
        this.setState({
            searchText: text,
            restaurants: filteredRestaurants
        });
    }

    renderHeader() {
        return(
            <View style={styles.searchContainer}>
                <Icon name='search' size={30} style={styles.searchIcon}/>
                <TextInput style={styles.searchTextInput}
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

    renderItem = (item) => {
        return <RestaurantListItem item={item} lang={this.props.preferredLang} onRestaurantPress={this.onRestaurantPress}/>
    }

	render() {
        if (this.props.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator/>
                </View>
            );
        }
		return (
			<View style={styles.container}>
                <FlatList
                    data={this.state.restaurants}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => this.renderItem(item)}
                    ListHeaderComponent={this.renderHeader}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loading: {
        flex: 1, 
        paddingTop: 20, 
        backgroundColor: 'white'
    },
    separator: {
        height: 1,
        backgroundColor: "#CED0CE"
    },
    searchContainer: {
        flexDirection: 'row', 
        marginTop: 10, 
        borderBottomColor: '#CED0CE', 
        borderWidth: 1, 
        borderColor: 'transparent'
    },
    searchIcon: {
        marginLeft: 10, 
        marginRight: 10
    },
    searchTextInput: {
        height: 40, 
        flex: 1
    },
    qrCodeIcon: {
        marginHorizontal: 10, 
        marginVertical: 5 
    }
});

const mapStateToProps = (state) => {
  const isLoading  = state.restaurants.isLoading;
  const restaurants =  state.restaurants.restaurants;
  const preferredLang =  state.app.settings.preferredLang;
  return {
    restaurants,
    isLoading,
    preferredLang
  };
};

RestaurantListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispath) => ({
  actions: bindActionCreators(ActionCreators, dispath)
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListScreen);