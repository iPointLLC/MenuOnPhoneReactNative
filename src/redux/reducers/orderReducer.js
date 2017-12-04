import _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
	restaurantId: null,
	dishes: [],
	sum: 0,
	tipsPercentage: 10,
	creationTimestamp: null,
	confirmedTimestamp: null,
	personCount: 1,
	tableNumber: null,
	countTable: {},
	status: null
};

export default (state = INITIAL_STATE, action) => {
	console.log(JSON.stringify(state));
	switch (action.type) {
	case actionTypes.ORDER_INIT: 
		return { ...state, restaurantId: action.payload };
	case actionTypes.ORDER_DISHES_CHANGED: 
		const newCountTable = {};
		for (let dish of action.payload) {
			newCountTable[dish.key] = 1;
		}
		return { ...state, dishes: action.payload, countTable: newCountTable };
	case actionTypes.ORDER_PERSON_COUNT_CHANGED: 
		return { ...state, personCount: action.payload };
	case actionTypes.ORDER_DISH_COUNT_CHANGED:
		return { ...state, countTable: action.payload };
	case actionTypes.ORDER_DISH_REMOVED:
		const keyToDelete = action.payload;
		return { ...state, 
			dishes: _.remove(state.dishes, (currentDish) => { return currentDish.key !== keyToDelete; }),
			countTable: _.omit(state.countTable, [keyToDelete]) };
	case actionTypes.ORDER_CANCELLED:
		return { ...state, ...INITIAL_STATE, dishes: [], countTable: {} };
	default:
		return state;
	}
};