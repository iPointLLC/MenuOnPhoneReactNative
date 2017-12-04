import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
	preLoad: {
		cuisineTypes: [],
		restaurantTypes: []
	},
	isOnboardingSeen: null,
	settings: {
		preferredLang: 'en',
		colorTheme: 'redTheme'
	}
};

export default (state = INITIAL_STATE, action) => {
	console.log(JSON.stringify(state));
	switch (action.type) {
	case actionTypes.SETTINGS_LOADED:
		return { ...state, settings: action.payload };
	case actionTypes.IS_ONBOARDING_SEEN_LOADED: 
		return { ...state, isOnboardingSeen: action.payload };
	case actionTypes.PRELOADS_LOADED: 
		return { ...state, preLoads: action.payload };
	default:
		return state;
	}
};