import React from 'react';
import { 
	NavigationActions,
	StackNavigator, 
	TabNavigator,  
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from '../containers/SplashScreen';
import OnboardingScreens from '../containers/OnboardingScreens';
import RestaurantListScreen from '../containers/RestaurantListScreen';
import AboutScreen from '../containers/AboutScreen';
import MapScreen from '../containers/MapScreen';
import ProfileScreen from '../containers/ProfileScreen';
import QRCodeScannerScreen from '../containers/QRCodeScannerScreen';
import SettingsScreen from '../containers/SettingsScreen';
import RegisterScreen from '../containers/RegisterScreen';
import LoginScreen from '../containers/LoginScreen';
import RestaurantDetailsScreen from '../containers/RestaurantDetailsScreen';
import RestaurantMenuScreen from '../containers/RestaurantMenuScreen';
import OrderScreen from '../containers/OrderScreen';
import I18n from '../i18n/i18n';

const RestaurantsStackNav = StackNavigator({
	RestaurantList: { screen: RestaurantListScreen },
	QRCodeScanner: { screen: QRCodeScannerScreen },
	RestaurantDetails: { screen: RestaurantDetailsScreen },
	RestaurantMenu: { screen: RestaurantMenuScreen },
	Order: { screen: OrderScreen  }
}, {
	transitionConfig: () => ({ screenInterpolator: () => null }),
	navigationOptions: {
		title: I18n.t('restaurants'),
		headerTintColor: 'white',
		headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#d64f6d' },
		headerBackTitle: null
	}
});

const MapStackNav = StackNavigator({
	Map: { screen: MapScreen },
}, {
	transitionConfig: () => ({ screenInterpolator: () => null }),
	navigationOptions: {
		title: I18n.t('map'),
		headerTintColor: 'white',
		headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#d64f6d' },
		headerBackTitle: null
	}
});

const ProfileStackNav = StackNavigator({
	Login: { screen: LoginScreen },
	Register: { screen: RegisterScreen },
	Profile: { screen: ProfileScreen },
}, {
	initialRouteName: 'Login',
	navigationOptions: {
		headerTintColor: 'white',
		headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#d64f6d' },
		headerBackTitle: null
	}
});

const AboutStackNav = StackNavigator({
	About: { screen: AboutScreen },
}, {
	transitionConfig: () => ({ screenInterpolator: () => null }),
	navigationOptions: {
		title: I18n.t('about'),
		headerTintColor: 'white',
		headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#d64f6d' },
		headerBackTitle: null
	}
});



const MainTabBar = TabNavigator({
	RestaurantsTab: { 
		screen: RestaurantsStackNav,
		transitionConfig: () => ({ screenInterpolator: () => null }),
		navigationOptions: {
			title: I18n.t('restaurants'),
			tabBarLabel: I18n.t('restaurants'),
			tabBarIcon: ({ tintColor }) => (<Icon name={'cutlery'} size={30} color={tintColor} />)
		}
	},
	MapTab: { 
		screen: MapStackNav,
		transitionConfig: () => ({ screenInterpolator: () => null }),
		navigationOptions: {
			title: I18n.t('map'),
			tabBarLabel: I18n.t('map'),
			tabBarIcon: ({ tintColor }) => (<Icon name={'map-marker'} size={30} color={tintColor} />)
		}  
	},
	ProfileTab: { 
		screen: ProfileStackNav,
		transitionConfig: () => ({ screenInterpolator: () => null }),
		navigationOptions: {
			title: I18n.t('profile'),
			tabBarLabel: I18n.t('profile'),
			tabBarIcon: ({ tintColor }) => (<Icon name={'user'} size={30} color={tintColor} />)
		}  
	},
	AboutTab: { 
		screen: AboutStackNav,
		transitionConfig: () => ({ screenInterpolator: () => null }),
		navigationOptions: {
			title: I18n.t('about'),
			tabBarLabel: I18n.t('about'),
			tabBarIcon: ({ tintColor }) => (<Icon name={'info-circle'} size={30} color={tintColor} />)
		}  
	},
}, {
	tabBarOptions: {
		activeTintColor: '#b20c30',
		inactiveTintColor: '#af7b66',
	},
	initialRouteName: 'RestaurantsTab',
	transitionConfig: () => ({ screenInterpolator: () => null }),
	navigationOptions: ({ navigation }) => ({
		tabBarOnPress: (tab, jumpToIndex) => {
			if (tab.focused) {
				if (tab.route.index !== 0) {
					navigation.dispatch(NavigationActions.reset({
						index: 0,
						actions: [
							NavigationActions.navigate({ routeName: tab.route.routes[0].routeName })
						]
					}));
				}
			} else {
				jumpToIndex(tab.index);
			}
		}
	})
});


const AppNavigator = StackNavigator({
	Splash: { 
		screen: SplashScreen,
		navigationOptions: {
			header: null
		}
	},
	Onboarding: { 
		screen: OnboardingScreens,
		navigationOptions: {
			header: null
		}

	},
	MainTabBar: { 
		screen: MainTabBar,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	},
	Settings: { 
		screen: SettingsScreen,
		navigationOptions: {
			title: I18n.t('settings'),
			headerTintColor: 'white',
			headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#d64f6d' },
			headerBackTitle: null
		}
	},
});

export default AppNavigator;
 