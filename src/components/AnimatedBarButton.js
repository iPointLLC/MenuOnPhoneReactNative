import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  Animated
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

class AnimatedBarButton extends Component {

	constructor (props) {
  		super(props)
  		this.springValue = new Animated.Value(1.0)
  		this.state = { 
  			iconImage: this.props.unselectImage
  		};
  		this.onPressHandler = this.onPressHandler.bind(this);

	};

	onPressHandler = () => {
		// this.props.onPress();
		this.animateSpring();
	}

	animateSpring() {
		const iconImage = (this.state.iconImage === this.props.unselectImage) ? this.props.selectImage : this.props.unselectImage;
          	this.setState({ 
          		iconImage 
          	});
		this.springValue.setValue(0.3);
          Animated.spring(
            this.springValue,
            {
              toValue: 1,
              friction: 1
            }
          ).start();
	}

	render() {
		return (
			<TouchableOpacity onPress={this.onPressHandler}>
        		<Animated.View style={{ transform: [{scale: this.springValue}] }}>
        			<Icon name={this.state.iconImage} size={30} color='white' style={styles.iconImage} />
        		</Animated.View>
      		</TouchableOpacity>
      	);
	};
};

const styles = StyleSheet.create({
	iconImage: {
		marginHorizontal: 10, 
		marginVertical: 5 
	}
});

export default AnimatedBarButton;