import React, { Component } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Image, 
	TextInput, 
	TouchableOpacity, 
	Alert 
} from 'react-native';
import Camera from 'react-native-camera';
import BackgroundTimer from 'react-native-background-timer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions';
import I18n from '../i18n/i18n';

class QRCodeScannerScreen extends Component {

	static intervalId = null;

	static navigationOptions = {
    	title: I18n.t('readBarCode'),
    	headerRight: null,
      tabBarVisible: false
  	};

  	componentWillMount() {
  		QRCodeScannerScreen.intervalId = BackgroundTimer.setInterval(() => {
  			this.setState({
  				bounds: null
  			});
    	}, 500);
  	}

  	componentWillUnmount() {
  		BackgroundTimer.clearInterval(QRCodeScannerScreen.intervalId);
  	}

	constructor(props) {
		super(props);
		this.state = {
			restaurantId: null,
			bounds: null
		}
	}

	onSuccessReadQRCode(e) {
		const data = e.data;
		if (data && data.includes("restaurantId")) {
			const indexOfRestaurantId = data.indexOf("restaurantId");
			const restaurantId = data.substring(indexOfRestaurantId).trim().split(":")[1].trim();
			if (restaurantId) {
				this.setState({
					restaurantId,
					bounds: e.bounds
				});
			}
		} else {
			this.setState({
				restaurantId: null,
				bounds: null
      });
    }
	}

	onShowRestaurantPress() {
      let restaurant;
      for (let item of this.props.restaurants) {
        if (item.key === this.state.restaurantId) {
          restaurant = item.restaurant;
          break;
        }
      }
      if (restaurant) {
        const { navigate } = this.props.navigation; 
        navigate('RestaurantDetails', { restaurant: restaurant, key: this.state.restaurantId });
      }
    }

	renderFoundButton() {
      let text = I18n.t('restaurantNotFound');
      let disabled = true;
      if (this.state.restaurantId) {
        text = I18n.t('showRestaurant')
        disabled = false;
      } 
      return (
        <TouchableOpacity  disabled={disabled} onPress={this.onShowRestaurantPress.bind(this)}
          style={[styles.foundButton, this.getButtonStyle(disabled) ]}>
          <Text style={ [styles.foundButtonText, this.getTextColor(disabled) ]}>{text}</Text>
        </TouchableOpacity>
      )
    }

    getButtonStyle(disabled) {
      const style = {}
      if (disabled) {
        style.backgroundColor =  'lightgray';
      } else {
        style.backgroundColor = "#d64f6d";
      }
      return style;
    }

    getTextColor(disabled) {
      const style = {}
      if (disabled) {
        style.color =  'black';
      } else {
        style.color = "white";
      }
      return style;
    }
 
    getGreenBoxStyle() {
      const style = { position: "absolute", 
                      borderColor: 'lawngreen' }
      if (this.state.bounds) {
        style.borderWidth = 4;
        style.left = parseFloat(this.state.bounds.origin.x); 
        style.top = parseFloat(this.state.bounds.origin.y);
        style.width = parseFloat(this.state.bounds.size.width);
        style.height = parseFloat(this.state.bounds.size.height);
      } else {
        style.borderWidth = 0;
      }
      return style;
    }

	render() {
		return (
			<View style={styles.container}>
				<Camera style={styles.camera} onBarCodeRead={this.onSuccessReadQRCode.bind(this)}
					ref={(cam) => {
						this.camera = cam;
					}}
					aspect={Camera.constants.Aspect.fill}>
					<View style={ this.getGreenBoxStyle() }/>
          			{ this.renderFoundButton() }
				</Camera>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	camera: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
  foundButton: {
    padding: 15, 
    marginBottom: 15, 
    borderRadius: 6 
  },
  foundButtonText: {
    fontSize: 16
  }
});

const mapDispatchToProps = (dispath) => ({
  actions: bindActionCreators(ActionCreators, dispath)
});

const mapStateToProps = (state) => {
  const restaurants = state.restaurants.restaurants;
  return {
    restaurants
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QRCodeScannerScreen);