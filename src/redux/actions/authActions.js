import * as actionTypes from './actionTypes';
import firebase from 'firebase';
import * as FirebaseErrors from 'FirebaseErrors';

export const updateUserProfile = (username) => 
	async (dispatch) => {
		const user = firebase.auth().currentUser;
		try {
			await user.updateProfile({ displayName: username })
			await firebase.database().ref(`/users/${user.uid}`).set({ username, email })
		} catch(error) {
			console.log(error);
		};
	}

export const sendPasswordResetEmail = (emailAddress) => 
	async (dispatch) => {
		passwordResetStarted(dispatch);
		try {
			await firebase.auth().sendPasswordResetEmail(emailAddress);
			passwordResetSucceeded(dispatch);
		} catch(error) {
			console.log(error);
			passwordResetFailed(dispatch, getHandledError(error, 'sendPasswordResetEmailErrors'));
		};
	};

export const updatePassword = (newPassword) => 
	async (dispatch) => {
		const user = firebase.auth().currentUser;
		try {
			await user.updatePassword(newPassword);
		} catch(error) {
			console.log(error);
		}
	}

export const reauthenticateWithCredential = (credential) => 
	async (dispatch) => {
		var user = firebase.auth().currentUser;
		try {
			await user.reauthenticateWithCredential(credential);
		} catch(error) {
			console.log(error);
		}
	}

export const deleteUser = () => 
	async (dispatch) => {
		const user = firebase.auth().currentUser;
		try {
			await user.delete();
		} catch(error) {
			console.log(error);
		}
	};

export const signOut = () => 
	async (dispatch) => {
		signOutStarted(dispatch);
		try {
			await firebase.auth().signOut();
			signOutSucceeded(dispatch)
		} catch (error) {
			console.log(error);
			signOutFailed(dispatch, getHandledError(error));
		}
	};

export const signInWithEmailAndPassword = (email, password) =>
	async (dispatch) => {
		authUserStarted(dispatch);
		try {
			const user = await firebase.auth().signInWithEmailAndPassword(email, password)
			authUserSucceed(dispatch, user);
		} catch (error) {
			console.log(error);
			authUserFailed(dispatch, error);
		}
	};

export const createUserWithEmailAndPassword = (email, password, username) => 
	async (dispatch) => {
		authUserStarted(dispatch);
		try {
			const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
			try {
				await user.updateProfile({ displayName: username })
				await firebase.database().ref(`/users/${user.uid}`).set({ username, email })
				authUserSucceed(dispatch, user);
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
			authUserFailed(dispatch, error);
		}
	};

const authUserStarted = (dispatch) => {
	dispatch({ type: actionTypes.AUTH_USER_STARTED });
};

const authUserFailed = (dispatch, error) => {
	dispatch({ 
		type: actionTypes.AUTH_USER_FAILED,
		payload: error
	});
};

const authUserSucceed = (dispatch, user) => {
	dispatch({
		type: actionTypes.AUTH_USER_SUCCEED,
		payload: user
	});
};

export const getLoggedInUser = (user) => 
	(dispatch) => {
		authUserSucceed(dispatch, user);
	};

export const authFormUpdated = ({ prop, value }) => ({
	type: actionTypes.AUTH_FORM_UPDATED,
	payload: { prop, value }
});

// User Management / Password Reset Email

const passwordResetStarted = (dispatch) =>
	dispatch({ type: actionTypes.PASSWORD_RESET_STARTED });

const passwordResetSucceeded = (dispatch) =>
	dispatch({ type: actionTypes.PASSWORD_RESET_SUCCEEDED });

const passwordResetFailed = (dispatch, error) =>
	dispatch({ 
		type: actionTypes.PASSWORD_RESET_FAILED,
		payload: error 
	});

// User Management / Sign Out

const signOutStarted = (dispatch) =>
	dispatch({ type: actionTypes.SIGN_OUT_STARTED });

const signOutSucceeded = (dispatch) =>
	dispatch({ type: actionTypes.SIGN_OUT_SUCCEEDED });

const signOutFailed = (dispatch, error) =>
	dispatch({ 
		type: actionTypes.SIGN_OUT_FAILED,
		payload: error 
	});

const getHandledError = (error, type) => {
	let errorToDisplay;
	const errorCode = error.code;
	const errorMessage = error.message;
	errorToDisplay = errorMessage;
	const decodedError = FirebaseErrors[type][errorCode];
	if (decodedError) {
		errorToDisplay = decodedError;
	};
	console.warn(errorToDisplay);
	return errorToDisplay;
}


