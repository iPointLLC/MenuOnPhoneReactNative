import React, { Component } from 'react';
import {
  StyleSheet,   
  Text,        
  View,
  StatusBar,
  Image         
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
import Swiper from '../components/Swiper';
import { saveIsOnboardingSeen } from '../helpers/appHelper';
import { ActionCreators } from '../redux/actions';
import I18n from '../i18n/i18n';

const IMAGES = {
  image1: require('../images/onboarding/screen2.png'), 
  image2: require('../images/onboarding/screen9.png'),
  image3: require('../images/onboarding/screen3.png'), 
  image4: require('../images/onboarding/screen6.png'), 
  image5: require('../images/onboarding/screen7.png'), 
}

const pages = [
  {imageName: IMAGES.image1, headerText: I18n.t('restaurants'), contentText: I18n.t('onboardingRestaurantsText'), backgroundColor: '#d64f6d'},
  {imageName: IMAGES.image2, headerText: I18n.t('readBarCode'), contentText: I18n.t('onboardingScanQRText'), backgroundColor: '#d64f6d'},
  {imageName: IMAGES.image3, headerText: I18n.t('details'), contentText: I18n.t('onboardingDetailsText'), backgroundColor: '#d64f6d'},
  {imageName: IMAGES.image4, headerText: I18n.t('menu'), contentText: I18n.t('onboardingMenuText'), backgroundColor: '#d64f6d'},
  {imageName: IMAGES.image5, headerText: I18n.t('order'), contentText: I18n.t('onboardingOrderText'), backgroundColor: '#d64f6d'}
];

class OnboardingScreens extends Component {

  static navigationOptions = () => ({
    header: null
  });

  renderSubViews = () => 
    pages.map((page, index) => (
      <View key={index} style={[styles.slide, { backgroundColor: page.backgroundColor }  ]}>
        <Text style={styles.header}>{page.headerText}</Text>
        <Image source={page.imageName} style={{ width: 240, height: null, flex: 0.7 }} resizeMode='contain' />
        <Text style={styles.text}>{page.contentText}</Text>
      </View>
    ));

  _navigateTo = (routeName: string) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  onDoneHandler() {
    this._navigateTo('MainTabBar');
    saveIsOnboardingSeen();
    StatusBar.setHidden(false);
  }

  render = () => (
    <Swiper onDoneHandler={ this.onDoneHandler.bind(this) }>
      { this.renderSubViews() }
    </Swiper>
  );

}

const iconStyles = {
  size: 100,
  color: '#FFFFFF',
};

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1,                    
    justifyContent: 'flex-start',   
    alignItems: 'center',
    paddingTop: 15     
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    marginTop: 15,
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});

const mapDispatchToProps = (dispath) => ({
  actions: bindActionCreators(ActionCreators, dispath)
});

export default connect(null, mapDispatchToProps)(OnboardingScreens);
