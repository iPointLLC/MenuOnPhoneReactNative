import React, { Component } from 'react';
import {
    StyleSheet,  
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import {
  Button,
  Text,
  FormInput,
  FormLabel,
  CheckBox,
  SearchBar,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { ActionCreators } from '../redux/actions';
import I18n from '../i18n/i18n';
import firebase from 'firebase';

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.signOutButtonTapped = this.signOutButtonTapped.bind(this);
    }

    componentWillMount() {
        this.props.navigation.setParams({ handleSignOut: this.signOutButtonTapped });
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login'})
                ]
            })
            this.props.navigation.dispatch(resetAction)
        }
      });
    }

    signOutButtonTapped = () => {
        Alert.alert(
            I18n.t('signOutAlertTtile'),
            I18n.t('signOutAlertText'),
            [
                { text: I18n.t('cancel'), style: 'cancel' },
                { text: I18n.t('ok'), onPress: () => {
                    this.props.actions.signOut();
                }},
            ],
            { cancelable: false }
        )
    }

    static navigationOptions = (options) => ({
        title: 'Profile',
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#d64f6d' },
        headerBackTitle: null,
        headerLeft: (
                <TouchableOpacity onPress={() => {
                    options.screenProps.openDrawer()
                }}>
                    <Icon name='bars' size={30} color='white' />
                </TouchableOpacity>
        ),
        headerRight: (
                <TouchableOpacity onPress={() => {
                    if (options &&
                        options.navigation &&
                        options.navigation.state &&
                        options.navigation.state.params &&
                        options.navigation.state.params.handleSignOut) {
                            options.navigation.state.params.handleSignOut()
                    }
                }}>
                    <Icon name='sign-out' size={30} color='white' />
                </TouchableOpacity>
        )
    })

    render() {
        return (
            <View style={styles.outerContainer}>
                <KeyboardAvoidingView 
                    behavior="padding"
                    style={styles.container}
                >
                
                </KeyboardAvoidingView>
                {this.props.isLoading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size='large' color='white' />
                    </View>
                }
			</View>
		);
	}
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
