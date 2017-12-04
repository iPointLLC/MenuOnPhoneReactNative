import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
	isLoading: true,
	restaurants: []
};

export default (state = INITIAL_STATE, action) => {
	console.log(JSON.stringify(state));
	switch (action.type) {
	case actionTypes.RESTAURANTS_LOADED:
		return { ...state, restaurants: action.payload, isLoading: false };
	default:
		return state;
	}
};