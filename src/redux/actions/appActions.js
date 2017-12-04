import * as actionTypes from './actionTypes';
import { AsyncStorage } from 'react-native';
import { getLanguages } from 'react-native-i18n'
import * as firebaseUtils from '../../firebase/firebaseUtils';

export const initializeApp = () => 
	async (dispatch) => {
      const preLoads = await loadPreLoads();
      preLoadsLoaded(dispatch, preLoads);
      const settings = await loadSettings();
      settingsLoaded(dispatch, settings);
      const isOnboardingSeen = await loadIsOnboardingSeen();
    	isOnboardingSeenLoaded(dispatch, isOnboardingSeen);
	};

const loadPreLoads = async () => {
  const cuisineTypes = await firebaseUtils.loadCuisineTypes().then();
  const restaurantTypes = await firebaseUtils.loadRestaurantTypes().then();
  return {
    cuisineTypes,
    restaurantTypes
  };

}

const loadSettings = async () => {
  const preferredLang = await loadPreferredLang();
  const colorTheme = await loadColorTheme();
  const settings = {
    preferredLang,
    colorTheme
  }
  return settings;
}

const loadPreferredLang = async () => {
  let preferredLang = 'en';
  try {
    const value = await AsyncStorage.getItem('preferredLang');
    if (value !== null) {
      preferredLang = JSON.parse(value);
    } else {
      const languages = await getLanguages();
      if (languages && languages.length > 0) {
        if (languages[0].toLowerCase().startsWith('en')) {
          preferredLang = 'en';
        } else if (languages[0].toLowerCase().startsWith('ru')) {
          preferredLang = 'ru';
        } else if (languages[0].toLowerCase().startsWith('cn')) {
          preferredLang = 'cn';
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  return preferredLang;
}

const loadColorTheme = async () => {
  let colorTheme = 'redTheme';
  try {
    const value = await AsyncStorage.getItem('colorTheme');
    if (value !== null ) {
      colorTheme = JSON.parse(value);
    }
  } catch (error) {
    console.log(error);
  }
  return colorTheme;
}

const loadIsOnboardingSeen = async () => {
  let isOnboardingSeen = false;
  try {
    const value = await AsyncStorage.getItem('isOnboardingSeen');
    if (value !== null ) {
      isOnboardingSeen = JSON.parse(value);
    }
  } catch (error) {
    console.log(error);
  }
  return isOnboardingSeen;
}

const settingsLoaded = (dispatch, settings) => {
  dispatch({ 
    type: actionTypes.SETTINGS_LOADED,
    payload: settings
  });
};

const preLoadsLoaded = (dispatch, preLoads) => {
  dispatch({ 
    type: actionTypes.PRELOADS_LOADED,
    payload: preLoads
  });
};

const isOnboardingSeenLoaded = (dispatch, isOnboardingSeen) => {
	dispatch({ 
		type: actionTypes.IS_ONBOARDING_SEEN_LOADED,
		payload: isOnboardingSeen
	});
};