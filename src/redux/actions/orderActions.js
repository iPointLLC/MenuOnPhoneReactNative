import * as actionTypes from './actionTypes';
import * as firebaseUtils from '../../firebase/firebaseUtils';

export const initOrder = (restaurantId) => ({
	type: actionTypes.ORDER_INIT,
	payload: restaurantId
});

export const orderDishesChanged = (dishes) => ({
	type: actionTypes.ORDER_DISHES_CHANGED,
	payload: dishes
});

export const orderPersonCountChanged = (count) => ({
	type: actionTypes.ORDER_PERSON_COUNT_CHANGED,
	payload: count
});

export const orderDishCountChanged = (table) => ({
	type: actionTypes.ORDER_DISH_COUNT_CHANGED,
	payload: table
});

export const orderDishRemoved = (key) => ({
	type: actionTypes.ORDER_DISH_REMOVED,
	payload: key
});

export const orderCancelled = () => ({
	type: actionTypes.ORDER_CANCELLED
});

export const saveOrderToServer = (order) => 
	(dispatch) =>
		firebaseUtils.saveOrderToServer(order).then((savedOrder) => 
			orderSavedToServer(dispatch, savedOrder)
		);

const orderSavedToServer = (dispatch, savedOrder) => {
	dispatch({
		type: actionTypes.ORDER_SAVED,
		payload: savedOrder
	});
};


