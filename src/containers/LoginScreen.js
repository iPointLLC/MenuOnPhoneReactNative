import React, { PureComponent } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	StyleSheet,
	Alert,
	ActivityIndicator
} from 'react-native';
import {
  Button,
  FormLabel, 
  FormInput
} from 'react-native-elements';
import socialColors from 'HSSocialColors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import { ActionCreators } from '../redux/actions';
import I18n from '../i18n/i18n';


class LoginScreen extends PureComponent {

  static navigationOptions = (options) => ({
    title: I18n.t('signIn'),
    headerTintColor: 'white',
    headerBackTitle: null,
    headerLeft: (
      <TouchableOpacity onPress={() => {
        options.screenProps.openDrawer()
      }}>
        <Icon name='bars' size={30} color='white' />
      </TouchableOpacity>
    )
  })

  	constructor(props) {
  		super(props);
      this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
  		this.focusNextField = this.focusNextField.bind(this);
  		this.onSignInButtonTapped = this.onSignInButtonTapped.bind(this);
    	this.inputs = {};
    	this.state = {
    		isModalVisible: false,
        isErrorShowing: false
  		}
  	}

    sendPasswordResetEmail = (emailAddress) => {
      this.props.actions.sendPasswordResetEmail(emailAddress);
    }

  	showModal = () => 
  		this.setState({ 
  			isModalVisible: true 
  		})

  	hideModal = () => 
  		this.setState({ 
  			isModalVisible: false 
  		})

  	setModalVisible(visible) {
    	this.setState({
    		modalVisible: visible
    	});
  	}

    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.navigation.navigate('Profile') 
        }
      });
    }

  	componentWillReceiveProps(nextProps) {
    	const { error } = nextProps;
        if (error && !this.state.isErrorShowing) {
          this.setState({
            isErrorShowing: true
          })
            Alert.alert(
  'Alert Title',
  error,
  [
    {text: 'OK', onPress: () => {
      console.warn('OK Pressed')
      
    }},
  ],
  { cancelable: false }
)
      }
  	}

  	componentDidUpdate() {
      // const { error } = this.props.;
      //   if (error === 'Authentication Failed') {
      //       Alert.alert(I18n.t('invalid'), I18n.t('emailOrPasswordIncorrect'))
      // }
    }

  	onSignInButtonTapped() {
      this.setState({
        isErrorShowing: false
      })
    	const { email, password } = this.props;
    	this.props.actions.signInWithEmailAndPassword(email, password);
  	}

  	focusNextField(id) {
    	this.inputs[id].focus();
  	}

	render() {
    console.warn(this.props.isLoading);
		return (
			<View style={styles.mainContainer}>
				<Modal isVisible={this.state.isModalVisible}>
          			<View style={styles.modalContainer}>
            			<View style={styles.modalHeaderContainer}>
            				<Text style={styles.modalHeaderText}>{I18n.t('forgotYourPassword')}</Text>
            			</View>
            			<View style={styles.modalInputsContainer}>
            			</View>
            			<View style={styles.modalButtonsContainer}>
            				<View style={styles.modalButtonContainer}>
            					<Button containerViewStyle={{ width: '80%' }} onPress={ () => {
                        this.sendPasswordResetEmail('danilov@ipoint.ru') 
                      }}
									title={I18n.t('sendEmail')}
								/>
            				</View>
            				<View style={styles.modalButtonContainer}>
            					<Button containerViewStyle={{ width: '80%' }} onPress={() => {  }}
									title={I18n.t('cancel')}
								/>
            				</View>
            			</View>
					</View>
        		</Modal>
				<View style={styles.credentialsInputContainer}>
					<FormLabel>{I18n.t('email')}</FormLabel>
					<FormInput autoCapitalize='none'
						autoCorrect={false}
						keyboardType='email-address'
						clearButtonMode='while-editing'
						blurOnSubmit={false}
						returnKeyType='next'
						placeholder={I18n.t('pleaseEnterYourEmail')}
						onSubmitEditing={() => {
							this.focusNextField('passwordInput')
						}}
						onChangeText={(text) => 
							this.props.actions.authFormUpdated({ prop: 'email', value: text })
                        }
                        value={this.props.email}
					/>
					<FormLabel>{I18n.t('password')}</FormLabel>
					<FormInput autoCapitalize='none'
						autoCorrect={false}
						clearButtonMode='while-editing'
						secureTextEntry
						blurOnSubmit={true}
						returnKeyType='done'
						placeholder={I18n.t('pleaseEnterYourPassword')}
						ref={ input => {
            				this.inputs['passwordInput'] = input;
          				}}
          				onChangeText={(text) => 
          					this.props.actions.authFormUpdated({ prop: 'password', value: text })
                        }
                        value={this.props.password}
					/>
					<View style={{ alignItems: 'center' }}>
						<TouchableOpacity onPress={this.showModal}>
							<Text>{I18n.t('forgotYourPassword')}</Text>
						</TouchableOpacity>
					</View>
					<Button 
							title={I18n.t('signIn')}
							onPress={this.onSignInButtonTapped}
					/>
					<View style={{ alignItems: 'center' }}>
						<Text>{I18n.t('orSignInWith')}</Text>
					</View>
					
					<View style={{ flexDirection: 'row'  }}>
						<Button title='Facebook'
								icon={{name: 'facebook-f', type: 'font-awesome'}}
								containerViewStyle={{ flex: 1 }}
								backgroundColor={socialColors.facebook} />
					</View>

					<View style={{ flexDirection: 'column', alignItems: 'center' }}>
						<Text>{I18n.t('dontHaveAnAccount')}</Text>
					</View>
					<Button onPress={() => { this.props.navigation.navigate('Register') }}
						title={I18n.t('register')}
					/>
				</View>
        {this.props.isLoading &&
            <View style={styles.loading}>
                <ActivityIndicator size='large' color='white'/>
            </View>
        }
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1
	},
	modalContainer: {
    	alignSelf: "center",
    	justifyContent: 'center',
    	alignItems: 'center',
    	height: 180,
    	width: 240,
    	backgroundColor: '#F5FCFF',
  	},
  	modalHeaderContainer: {
  		justifyContent: 'center',
  		alignItems: 'center'  
  	},
  	modalInputsContainer: {

  	},
  	modalButtonsContainer: {
  		flexDirection: 'row',
  		flex: 1,
  		backgroundColor: 'red'
  	},
  	modalButtonContainer: {
  		flex: 1,
  		backgroundColor: 'blue'
  	},
  	modalHeaderText: {
  		textAlign: 'center'
  	},
  	loading: {
    	position: 'absolute',
    	left: 0,
    	right: 0,
    	top: 0,
    	bottom: 0,
    	alignItems: 'center',
    	justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
  	}
});

const mapStateToProps = (state) => {
  const { auth } = state;
  const { email, password, error, isLoading, user } = auth;
  return {
  	user,
    email,
    password,
    error,
    isLoading
  };
};

const mapDispatchToProps = (dispath) => ({
  actions: bindActionCreators(ActionCreators, dispath)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);