import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
  StyleSheet
} from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  ActivityIndicator
} from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions';
import I18n from '../i18n/i18n';

class RegisterScreen extends Component {

	static navigationOptions = {
    	title: I18n.t('register')
  	};

  	constructor(props) {
  		super(props);
  		this.focusNextField = this.focusNextField.bind(this);
  		this.onContinueButtonTapped = this.onContinueButtonTapped.bind(this);
  		this.onInputTextChanged = this.onInputTextChanged.bind(this);
    	this.inputs = {};
  	}

  	componentWillReceiveProps(nextProps) {
    	// const { error } = nextProps;
    	// 	if (error === 'Authentication Failed') {
     //  			Alert.alert(I18n.t('invalid'), I18n.t('emailOrPasswordIncorrect'))
    	// }
  	}

  	onContinueButtonTapped() {
  		const { email, password, username } = this.props;
    	this.props.actions.createUserWithEmailAndPassword(email, password, username);
  	}

  	onInputTextChanged(propName, propValue) {
  		this.props.actions.authFormUpdated({ prop: propName, value: propValue })
  	}

  	focusNextField(id) {
    	this.inputs[id].focus();
  	}

	render() {
		return (
			<View>
				
				<FormLabel>
                    {I18n.t('username')}
                </FormLabel>
                <FormInput 
                    placeholder={I18n.t('pleaseEnterYourUsername')}
                    autoCorrect={false}
                    autoCapitalize='none'
                    returnKeyType='next'
                    clearButtonMode='while-editing'
                    blurOnSubmit={false}
                    ref={ input => {
            			this.inputs['usernameInput'] = input;
          			}}
          			onChangeText={ text => {
          				this.onInputTextChanged('username', text);
          			}}
					onSubmitEditing={() => {
						this.focusNextField('emailInput')
					}}
					value={this.props.username}
                />
                <FormLabel>
                    {I18n.t('email')}
                </FormLabel>
                <FormInput 
                    placeholder={I18n.t('pleaseEnterYourEmail')} 
                    keyboardType='email-address'
                    autoCorrect={false}
                    autoCapitalize='none'
                    returnKeyType='next'
                    clearButtonMode='while-editing'
                    blurOnSubmit={false}
                    ref={ input => {
            			this.inputs['emailInput'] = input;
          			}}
          			onSubmitEditing={() => {
						this.focusNextField('passwordInput')
					}}
					onChangeText={ text => {
          				this.onInputTextChanged('email', text);
          			}}
          			value={this.props.email}
                />
                <FormLabel>
                    {I18n.t('password')}
                </FormLabel>
                <FormInput 
                    placeholder={I18n.t('pleaseEnterYourPassword')} 
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize='none'
                    returnKeyType='next'
                    clearButtonMode='while-editing'
                    blurOnSubmit={false}
                    ref={ input => {
            			this.inputs['passwordInput'] = input;
          			}}
          			onSubmitEditing={() => {
						this.focusNextField('confirmPasswordInput')
					}}
					onChangeText={ text => {
          				this.onInputTextChanged('password', text);
          			}}
          			value={this.props.password}
                />
                <FormLabel>
                    {I18n.t('сonfirmPassword')}
                </FormLabel>
                <FormInput 
                    placeholder={I18n.t('pleaseConfirmYourPassword')}
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize='none'
                    returnKeyType='done'
                    clearButtonMode='while-editing'
                    blurOnSubmit={true}
                    ref={ input => {
            			this.inputs['confirmPasswordInput'] = input;
          			}}
          			onChangeText={ text => {
          				this.onInputTextChanged('confirmPassword', text);
          			}}
          			value={this.props.confirmPassword}
                />
                <Button
                    onPress={this.onContinueButtonTapped}
                    icon={{ name: 'done' }}
                    buttonStyle={{ marginTop: 15 }}
                    title={I18n.t('continue')}
                />
			</View>
		);
	}
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const { email, password, error, isLoading, username, confirmPassword} = auth;
  return {
  	username,
    email,
    password,
    error,
    isLoading,
    confirmPassword
  };
};

const styles = StyleSheet.create({
	loading: {
    	position: 'absolute',
    	left: 0,
    	right: 0,
    	top: 0,
    	bottom: 0,
    	alignItems: 'center',
    	justifyContent: 'center'
  	}
})

const mapDispatchToProps = (dispath) => ({
  actions: bindActionCreators(ActionCreators, dispath)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);