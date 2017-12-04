import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions';
import I18n from '../i18n/i18n';

class DrawerScreen extends Component {

  constructor(props) {
    super(props);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.pressLink = this.pressLink.bind(this);
  }

  closeDrawer() {
    this.props.drawerMethods.closeDrawer();
  }

  pressLink(screen) {
    this.props.actions.navigate(screen);
    this.props.drawerMethods.closeDrawer();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.titleContainer}>
            <View>
              <Image source={require('../images/app_main_icon.png')} style={styles.appIconImage} />
            </View>
            <View>
              <Text style={styles.mainTitle}>Menu On Phone</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.closeContainer} onPress={this.closeDrawer}>
              <Icon name={'times'} size={20} color={'#d64f6d'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => this.pressLink('Settings')}>
            <Icon name={'cog'} size={20} color={'#d64f6d'} />
            <Text style={styles.menus}>{I18n.t('settings')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 0.2,
    marginTop: 30,
    flexDirection: 'row'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#b20c30'
  },
  appIconImage: {
    width: 50,
    height: 50
  },
  closeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  menuContainer: {
    flex: 0.6,
  },

  menuItem: {
    marginLeft: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 30,
    marginRight: 10
  },

  menus: {
    color: '#d64f6d',
    fontSize: 20,
    marginLeft: 10 
  },
  text: {
    color: '#d64f6d'
  }
});

const mapStateToProps = (state) => ({
	nav: state.nav
});


const mapDispatchToProps = (dispath) => ({
  actions: bindActionCreators(ActionCreators, dispath)
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerScreen);