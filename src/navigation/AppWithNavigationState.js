import React, { Component } from 'react';
import {
	StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNavigationHelpers } from 'react-navigation';
import Drawer from 'react-native-drawer';
import AppNavigator from './AppNavigator';
import DrawerScreen from '../containers/DrawerScreen';
import * as firebaseUtils from '../firebase/firebaseUtils';
import { ActionCreators } from '../redux/actions';

class AppWithNavigationState extends Component {

	componentWillMount() {
		StatusBar.setBarStyle('light-content');
		StatusBar.setHidden(true);
		// firebaseUtils.addAuthChangeListener(this.props.actions.getLoggedInUser);
	}

	constructor() {
		super();
		this.openDrawer = this.openDrawer.bind(this);
		this.closeDrawer = this.closeDrawer.bind(this);
	}

	openDrawer() {
		this.drawer.open();
	}

	closeDrawer() {
		this.drawer.close();
	}

	render() {
		const drawerMethods = {
			openDrawer: this.openDrawer,
			closeDrawer: this.closeDrawer,
		};
		const isOnboardingSeen = this.props.app.isOnboardingSeen;
		if (isOnboardingSeen) {
			StatusBar.setHidden(false);
		}
		return (
			<Drawer
				ref={ref => (this.drawer = ref)}
				type="displace"
				content={<DrawerScreen drawerMethods={drawerMethods} />}
				tapToClose
				openDrawerOffset={0.25}
				panOpenMask={-1}
				onOpen={() => {
					StatusBar.setBarStyle('dark-content');
				}}
				onClose={() => {
					StatusBar.setBarStyle('light-content');
				}}
				tweenHandler={ratio => ({
					main: { opacity: (2 - ratio) / 2 },
				})}
			>
				<AppNavigator 
					navigation = { addNavigationHelpers({ 
						dispatch: this.props.dispatch,
						state: this.props.nav
					})}
					screenProps={drawerMethods}
				/>
			</Drawer>
		);
	}
}

AppWithNavigationState.propTypes = {
	dispatch: PropTypes.func.isRequired,
	nav: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	nav: state.nav,
	app: state.app
});

const mapDispatchToProps = (dispatch) => {
	return Object.assign({},
		{dispatch: dispatch},
		{actions: bindActionCreators(ActionCreators, dispatch)}
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);