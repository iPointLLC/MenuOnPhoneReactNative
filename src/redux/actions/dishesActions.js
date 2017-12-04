import * as actionTypes from './actionTypes';
import * as firebaseUtils from '../../firebase/firebaseUtils';

export const getDishes = (restaurantId) =>
	(dispatch) =>
		firebaseUtils.loadDishes(restaurantId).then((dishes) =>
			dishesLoaded(dispatch, dishes)
		);

const dishesLoaded = (dispatch, dishes) => {
	dispatch({
		type: actionTypes.DISHES_LOADED,
		payload: dishes
	});
};

