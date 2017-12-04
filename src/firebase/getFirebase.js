import * as firebase from 'firebase';

let FirebaseApp;

const config = {
	apiKey: 'AIzaSyADrRoDJfcCyMgiiIlefYXYab-69h2__Eo',
	authDomain: 'menuonphone-3ad64.firebaseapp.com',
	databaseURL: 'https://menuonphone-3ad64.firebaseio.com',
	projectId: 'menuonphone-3ad64',
	storageBucket: 'menuonphone-3ad64.appspot.com',
	messagingSenderId: '868452526664'
};

export const getFirebase = () => {
	if (!FirebaseApp) {
		FirebaseApp = firebase.initializeApp(config);
	}
	return FirebaseApp;
};
