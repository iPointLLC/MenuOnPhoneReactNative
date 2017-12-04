import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';
import I18n from '../i18n/i18n';

class SettingsScreen extends Component {

	static navigationOptions = {
  		title: I18n.t('settings')	
	};

	render() {
		return (
			<View>
				<Text>{I18n.t('settings')}</Text>
			</View>
		);
	}
}

export default SettingsScreen;