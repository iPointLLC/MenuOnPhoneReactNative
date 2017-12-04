import { combineReducers } from 'redux';
import navReducer from './navReducer';
import appReducer from './appReducer';
import authReducer from './authReducer';
import restaurantsReducer from './restaurantsReducer';
import dishesReducer from './dishesReducer';
import orderReducer from './orderReducer';

const RootReducer = combineReducers({
	app: appReducer,
	nav: navReducer,
	auth: authReducer,
	restaurants: restaurantsReducer,
	dishes: dishesReducer,
	order: orderReducer
});

export default RootReducer;

