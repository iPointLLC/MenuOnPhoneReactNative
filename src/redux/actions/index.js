import * as appActions from './appActions';
import * as navigationActions from './navigationActions';
import * as authActions from './authActions';
import * as restaurantsActions from './restaurantsActions';
import * as dishesActions from './dishesActions';
import * as orderActions from './orderActions';

export const ActionCreators = Object.assign({},
	appActions,
	navigationActions,
	authActions,
	restaurantsActions,
	dishesActions,
	orderActions
);