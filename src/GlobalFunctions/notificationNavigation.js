import { navigationRef } from '../utils/NavigationContext';

function navigateWithinMainStack(screenName, params) {
	if (!navigationRef.current) {
		console.log('Navigation reference not ready; skipping redirect');
		return false;
	}

	try {
		navigationRef.current.navigate('MainStack', {
			screen: screenName,
			params,
		});
		return true;
	} catch (error) {
		console.log('MainStack navigation failed, falling back to direct route', error);
	}

	return false;
}

export function navigateToMainStackRoute(screen = 'MyOrdersList', params) {
	const targetScreen = screen || 'MyOrdersList';
	const handled = navigateWithinMainStack(targetScreen, params);

	if (!handled && navigationRef.current) {
		navigationRef.current.navigate(targetScreen, params);
	}
}
