import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
	isLoading: true,
	dishes: []
};

export default (state = INITIAL_STATE, action) => {
	console.log(JSON.stringify(state));
	switch (action.type) {
	case actionTypes.DISHES_LOADED:
		return { ...state, dishes: action.payload, isLoading: false };
	default:
		return state;
	}
};