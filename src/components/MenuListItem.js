import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import I18n from '../i18n/i18n';

class MenuListItem extends PureComponent {

  constructor(props) {
    super(props);
    this.onItemPress = this.onItemPress.bind(this);
  }

  onItemPress = () => {
    this.props.onPress(this.props.item)
  }

  renderCheck() {
    if(this.props.isSelected) {
      return (
        <View style={styles.checkIconContainer}>
            <Icon name='check' size={30} style={styles.checkIcon} />
          </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onItemPress}>
          <View style={styles.containerInner}>
            <View style={styles.dishImageContainer}>
              <Image style={styles.dishImage}
                source={{uri: this.props.item.dish.imageUrl}}
              />
            </View>
            <View style={styles.propertiesContainer}>
              <Text style={styles.nameTitleText}>{this.props.item.dish.name[this.props.lang]}</Text>
              <Text style={styles.weightText}>{this.props.item.dish.weight} {I18n.t('grams')}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{this.props.item.dish.price} {I18n.t('rubles')}</Text>
            </View>
            {this.renderCheck()}
        </View>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerOuter: {
    paddingVertical: 10
  },
  containerInner: {
    flex: 1, 
    flexDirection: 'row', 
    paddingVertical: 10 
  },
  priceContainer: {
    width: 120, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  priceText: {
    color: 'green', 
    fontSize: 20
  },
  propertiesContainer: {
    flex: 1, 
    justifyContent: 'center'
  },
  dishImage: {
    width: 70, 
    height: 70, 
    borderRadius: 35 
  },
  dishImageContainer: {
    width: 80, 
    padding: 10, 
    marginRight: 10, 
    justifyContent: 'center' 
  },
  nameTitleText: {

  },
  weightText: {
    color: 'darkgrey'
  },
  checkIconContainer: {
    justifyContent: 'center'
  },
  checkIcon: {
    marginLeft: 10, 
    marginRight: 10 
  }
});

export default MenuListItem;