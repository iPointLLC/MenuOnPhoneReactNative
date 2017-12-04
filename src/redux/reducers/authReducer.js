import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
	email: '',
	password: '',
	confirmPassword: '',
	user: null,
	error: '',
	isLoading: false,
	username: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case actionTypes.AUTH_FORM_UPDATED: 
		return { ...state, error: '', [action.payload.prop]: action.payload.value };
	case actionTypes.AUTH_USER_STARTED:
		return { ...state, isLoading: true, error: '' };
	case actionTypes.AUTH_USER_SUCCEED:
		return { ...state, isLoading: false, user: action.payload };
	case actionTypes.AUTH_USER_FAILED:
		return { ...state, isLoading: false, error: action.payload, password: '', confirmPassword: '' };
	// User Management / Password Reset Email
	case actionTypes.PASSWORD_RESET_STARTED:
		return { ...state, isLoading: true };
	case actionTypes.PASSWORD_RESET_SUCCEEDED:
		return { ...state, isLoading: false };
	case actionTypes.PASSWORD_RESET_FAILED:
		return { ...state, isLoading: false, error: action.payload };
	// User Management / Sign Out
	case actionTypes.SIGN_OUT_STARTED:
		return { ...state, isLoading: true };
	case actionTypes.SIGN_OUT_SUCCEEDED:
		return { ...state, ...INITIAL_STATE };
	case actionTypes.SIGN_OUT_FAILED:
		return { ...state, isLoading: false, error: action.payload };
	// 
	default:
		return state;
	}
};


