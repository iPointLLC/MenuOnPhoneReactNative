import { NavigationActions } from 'react-navigation';

export const navigate = (route, params) =>
	(dispatch) =>
		dispatch(NavigationActions.navigate({ routeName: route, params }));