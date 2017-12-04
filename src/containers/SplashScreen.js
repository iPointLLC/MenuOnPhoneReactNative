import React, { Component } from 'react';
import { 
	StyleSheet, 
	View,
	Text,
	Image,
	ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { ActionCreators } from '../redux/actions';

class SplashScreen extends Component {

	static navigationOptions = () => ({
    	header: null
  	});

	componentDidMount () {
		setTimeout(() => {
			this.props.actions.initializeApp();
		}, 2000);
	}

	componentDidUpdate() {
		if (this.props.isOnboardingSeen !== null) {
			if (this.props.isOnboardingSeen) {
				this._navigateTo('MainTabBar')
			} else {
				this._navigateTo('Onboarding')
			}
		}
	}

	_navigateTo = (routeName: string) => {
		const resetAction = NavigationActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({ routeName })]
		})
    	this.props.navigation.dispatch(resetAction)
  	}

	render () {
		return (
			<View style={styles.container}>
				<Image source={require('../images/splash_screen.jpg')} style={styles.backgroundImage} />
				<Text style={styles.title}>MenuOnPhone</Text>
				<View style={styles.loading}>
					<ActivityIndicator size='large' color='white' />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
    	left: 0,
    	right: 0,
    	top: 0,
    	bottom: 0,
    	alignItems: 'center',
    	justifyContent: 'center'
	},
	title: {
		position: 'absolute',
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 36,
		fontWeight: 'bold',
		textAlign: 'center',
		left: 10,
		right: 10,
		top: 30

	},
	container: {
		flex: 1,
		flexDirection: "row",
        alignItems: "stretch"
	},
	backgroundImage: {
		flex: 1,
		height: null,
		width: null
	}
});

const mapStateToProps = (state) => {
	const isOnboardingSeen = state.app.isOnboardingSeen;
	return {
		isOnboardingSeen
	};
};

const mapDispatchToProps = (dispath) => ({
	actions: bindActionCreators(ActionCreators, dispath)
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);