/**
 * @providesModule FirebaseErrors
 */

export const signInWithEmailAndPasswordErrors = {
	'auth/invalid-email': 'Email is invalid',
	'auth/user-disabled': 'User is disabled',
	'auth/user-not-found': 'User is not found',
	'auth/wrong-password': 'Wrong Password'
};

export const createUserWithEmailAndPasswordErrors = {
	'auth/email-already-in-use': true,
	'auth/invalid-email': true,
	'auth/operation-not-allowed': true,
	'auth/weak-password': true
};

export const sendPasswordResetEmailErrors = {
	'auth/invalid-email': 'Thrown if the email address is not valid.',
	'auth/missing-android-pkg-name': 'An Android package name must be provided if the Android app is required to be installed.',
	'auth/missing-continue-uri': 'A continue URL must be provided in the request.',
	'auth/missing-ios-bundle-id': 'An iOS Bundle ID must be provided if an App Store ID is provided.',
	'auth/invalid-continue-uri': 'The continue URL provided in the request is invalid.',
	'auth/unauthorized-continue-uri': 'The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase console.',
	'auth/user-not-found': 'Thrown if there is no user corresponding to the email address.'
};