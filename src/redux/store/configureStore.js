import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

const INITIAL_STATE = {};

const configureStore = (initialState) => {
	const logger = createLogger();
	const enhancer = applyMiddleware(thunk, logger);
	const store = createStore(rootReducer, initialState, enhancer);
	return store;
};

const store = configureStore(INITIAL_STATE);

export default store;