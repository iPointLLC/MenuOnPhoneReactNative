import * as actionTypes from './actionTypes';
import * as firebaseUtils from '../../firebase/firebaseUtils';

export const getRestaurants = () =>
	(dispatch) =>
		firebaseUtils.loadRestaurants().then((restaurants) =>
			restaurantsLoaded(dispatch, restaurants)
		);

const restaurantsLoaded = (dispatch, restaurants) => 
	dispatch({
		type: actionTypes.RESTAURANTS_LOADED,
		payload: restaurants
	});

