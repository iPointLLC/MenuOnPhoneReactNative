import * as firebase from 'firebase';

let FirebaseApp;

const config = {
	apiKey: 'apiKey',
	authDomain: 'authDomain',
	databaseURL: 'databaseURL',
	projectId: 'projectId',
	storageBucket: 'storageBucket',
	messagingSenderId: 'messagingSenderId'
};

export const getFirebase = () => {
	if (!FirebaseApp) {
		FirebaseApp = firebase.initializeApp(config);
	}
	return FirebaseApp;
};
