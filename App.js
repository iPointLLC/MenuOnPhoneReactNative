import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store/configureStore';
import AppWithNavigationState from './src/navigation/AppWithNavigationState';
import { getFirebase } from './src/firebase/getFirebase';

export default class App extends Component {

	componentWillMount() {
		getFirebase();		
	}

	render() {
		return (
			<Provider store={store}>
				<AppWithNavigationState />
			</Provider>
		);
	}

}

