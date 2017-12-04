import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import StarRating from 'react-native-star-rating';

class RestaurantListItem extends PureComponent {

  getFormattedCuisineList() {
    return this.props.item.restaurant.cuisine.join(', ');
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onRestaurantPress(this.props.item.restaurant, this.props.item.key)}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.restaurantImage}
              source={{ uri: this.props.item.restaurant.imageUrl }}
            />
          </View>
          <View style={styles.propertyContainer}>
            <View style={styles.propertyContainer}>
              <Text style={styles.nameTitleText}>{this.props.item.restaurant.name[this.props.lang]}</Text>
            </View>
            <View style={styles.starsRatingContainer}>
              <StarRating
                disabled={true}
                maxStars={5}
                starColor={'#d64f6d'}
                starSize={15}
                rating={this.props.item.restaurant.rating}
              />
            </View>
            <View style={styles.propertyContainer}>
              <Text style={styles.addressText}>{this.props.item.restaurant.address[this.props.lang]}</Text>
            </View>
            <View style={styles.propertyContainer}>
              <Text style={styles.cuisineText}>{ this.getFormattedCuisineList() }</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10, 
    flexDirection: 'row'
  },
  imageContainer: {
    marginRight: 10, 
    justifyContent: 'center' 
  },
  nameTitleText: {
    fontSize: 18, 
    fontWeight: 'bold'
  },
  restaurantImage: {
    width: 80, 
    height: 80, 
    borderRadius: 40
  },
  addressText: {
    fontSize: 16, 
    color: 'darkgray'
  },
  cuisineText: {
    fontSize: 16, 
    color: 'gray'
  },
  propertyContainer: {
    flex: 1 
  },
  starsRatingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'flex-start'
  }
});

export default RestaurantListItem;