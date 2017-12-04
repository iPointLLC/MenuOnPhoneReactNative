import AppNavigator from '../../navigation/AppNavigator';

const INITIAL_STATE = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Splash'));

const removeDuplicateRoutes = (state) => {
	if (!state.routes) return state;

	let duplicateRoutesCount = 0;

	const routes = state.routes.reduce((out, route, index) => {
		const cleanRoute = removeDuplicateRoutes(route);

		if (!index) {
			out.push(cleanRoute);
		} else {
			const prevIndex = index - 1;
			const prevRouteName = out[prevIndex].routeName;
			if (prevRouteName === route.routeName) {
				++duplicateRoutesCount;
				out[prevIndex] = cleanRoute;
			} else {
				out.push(cleanRoute);
			}
		}
		return out;
	}, []);

	state.routes = routes;
	state.index -= duplicateRoutesCount;

	return state;
};

export default (state = INITIAL_STATE, action) => {
	let cleanState = removeDuplicateRoutes(state);
	const nextState = AppNavigator.router.getStateForAction(action, cleanState);
	return nextState || cleanState;
};