import firebase from 'firebase';
import { getFirebase } from './getFirebase';

const FirebaseApp = getFirebase();
const restaurantsRef = FirebaseApp.database().ref().child('restaurants');
const dishesRef = FirebaseApp.database().ref().child('dishes');
const ordersRef = FirebaseApp.database().ref().child('orders');
const cuisineTypesRef = FirebaseApp.database().ref().child('cuisineTypes');
const restaurantTypesRef = FirebaseApp.database().ref().child('restaurantTypes');

export const signOut = (successHandler, errorHandler) => {
	firebase.auth().signOut()
		.then(() => {

		}).catch(error => {

		});
};

export const deleteUser = () => {
	const user = firebase.auth().currentUser;
	if (user) {
		user.delete().then(() => {

		}).catch(error => {

		});
	}
};


export const loadCuisineTypes = () => 
	new Promise((resolve) => {
		cuisineTypesRef.once('value').then((snapshot) => {
			if (snapshot) {
				const cuisineTypes = [];
				snapshot.forEach((child) => {
					const key = child.key;
					const cuisineType = child.val();
					const cuisineTypeObject = { key, cuisineType };
					cuisineTypes.push(cuisineTypeObject);
				});
				resolve(cuisineTypes);
			}
		});
	});

export const loadRestaurantTypes = () => 
	new Promise((resolve) => {
		restaurantTypesRef.once('value').then((snapshot) => {
			if (snapshot) {
				const restaurantTypes = [];
				snapshot.forEach((child) => {
					const key = child.key;
					const restaurantType = child.val();
					const restaurantTypeObject = { key, restaurantType };
					restaurantTypes.push(restaurantTypeObject);
				});
				resolve(restaurantTypes);
			}
		});
	});

export const addAuthChangeListener = (loggedInHandler, loggedOutHandler) => 
	firebase.auth().onAuthStateChanged(user => {
		if (loggedInHandler && user) {
			loggedInHandler(user);
		} else if (loggedOutHandler) {
			loggedOutHandler();
		}
	});

export const loadRestaurants = () =>
	new Promise((resolve) => {
		restaurantsRef.once('value').then((snapshot) => {
			if (snapshot) {
				const restaurants = [];
				snapshot.forEach((child) => {
					const key = child.key;
					const restaurant = child.val();
					const restaurantObject = { key, restaurant };
					restaurants.push(restaurantObject);
				});
				resolve(restaurants);
			}
		});
	});

export const loadDishes = (restaurantId) =>
	new Promise((resolve) => {
		dishesRef.child(restaurantId).once('value').then((snapshot) => {
			if (snapshot) {
				const dishes = [];
				snapshot.forEach((child) => {
					const key = child.key;
					const dish = child.val();
					const dishObject = { key, dish };
					dishes.push(dishObject);
				});
				resolve(dishes);
			}
		});
	});

export const saveOrderToServer = (order) => {
	var newOrderKey = ordersRef.child(order.restaurantId).push().key;
	var updates = {};
	updates[order.restaurantId + '/' + newOrderKey] = order;
	return ordersRef.update(updates);
};
