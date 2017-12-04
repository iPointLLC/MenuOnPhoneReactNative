import React, { Component } from 'react';
import {
  StyleSheet,
  View, 
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import I18n from '../i18n/i18n';
import AnimatedBarButton from '../components/AnimatedBarButton';

class RestaurantDetailsScreen extends Component {

  static navigationOptions = {
    title: I18n.t('details'),
    tabBarVisible: false,
    headerRight: (
      <AnimatedBarButton 
        unselectImage = {'heart-o'}
        selectImage = {'heart'}
      />
    )
  };

  constructor(props) {
    super(props);
    this.onShowMenuButtonPress = this.onShowMenuButtonPress.bind(this);
  }

  onShowMenuButtonPress = () => {
    const { key } = this.props.navigation.state.params;
    const { navigate } = this.props.navigation; 
    navigate('RestaurantMenu', { key: key } );
  };

  getFormattedArrayList(array) {
    return array.join(", ");
  };

  renderRestaurantStringProperty(key, value, modifier) {
    return (
      <View style={styles.propertyContainer}>
        <View style={styles.propertyNameContainer}>
          <Text style={styles.propertyNameText}>{key}</Text>
        </View>
        <View style={styles.propertyValueContainer}>
          <Text style={styles.propertyValueText}>{value}{modifier}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { restaurant, key } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <ScrollView >
            <View style={styles.container}>
              <View style={styles.container}>
                <Image style={styles.restaurantImage} 
                  resizeMode="cover" 
                  source={{ uri: restaurant.imageUrl }}/>
              </View>
              <View style={styles.restaurantInfoContainer}>
                <View style={styles.startRatingContainerOuter}>
                  <View style={styles.startRatingContainerInner}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      starColor={'#d64f6d'}
                      starSize={20}
                      rating={restaurant.rating}
                    />
                  </View>
                </View>
                { this.renderRestaurantStringProperty(I18n.t('name'), restaurant.name[this.props.preferredLang]) }
                { this.renderRestaurantStringProperty(I18n.t('address'), restaurant.address[this.props.preferredLang]) }
                { this.renderRestaurantStringProperty(I18n.t('phone'), restaurant.phone) }
                { this.renderRestaurantStringProperty(I18n.t('cuisine'), this.getFormattedArrayList(restaurant.cuisine)) }
                { this.renderRestaurantStringProperty(I18n.t('type'), this.getFormattedArrayList(restaurant.type)) }
                { this.renderRestaurantStringProperty(I18n.t('averagePrice'), restaurant.averagePrice, (' ' + I18n.t('rubles'))) }
                { this.renderRestaurantStringProperty(I18n.t('openingHours'), (restaurant.openingHours)) }
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.showMenuButton} 
            onPress={this.onShowMenuButtonPress}>
            <Text style={styles.showMenuButtonText}>{I18n.t('showMenu')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  propertyContainer: {
    flex: 1, 
    flexDirection: 'row', 
    marginHorizontal: 10, 
    marginVertical: 10
  },
  propertyNameContainer: {
    flex: 3
  },
  propertyValueContainer: {
    flex: 7,
    paddingLeft: 10
  },
  propertyNameText: {
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  propertyValueText: {
    fontSize: 18
  },
  bottomContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  showMenuButton: {
    borderRadius: 6, 
    backgroundColor: '#d64f6d'
  },
  showMenuButtonText: {
    color: 'white', 
    fontWeight: 'bold', 
    marginHorizontal: 20, 
    marginVertical: 10
  },
  restaurantImage: {
    flex: 1, 
    width: null, 
    height: 240
  },
  restaurantInfoContainer: {
    flex: 2
  },
  startRatingContainerOuter: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 10
  },
  startRatingContainerInner: {
    flex: 0.7 
  }
});

const mapStateToProps = (state) => {
  const preferredLang =  state.app.settings.preferredLang;
  return {
    preferredLang
  };
};

export default connect(mapStateToProps, null)(RestaurantDetailsScreen);
