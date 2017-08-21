import _ from 'lodash';
import { LOCATION_CHANGE, push, replace, go, goBack, goForward } from 'react-router-redux';

function locationChange (pathname, state) {
	return {
		type: LOCATION_CHANGE,
		payload: {
			pathname,
			search: '',
			hash: '',
			state: state || null,
			action: 'PUSH'
		}
	}
};

export { locationChange, replace, go, goBack, goForward };