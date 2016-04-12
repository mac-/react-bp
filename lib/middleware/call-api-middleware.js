import BaseApi from '../services/BaseApi';
import { config } from '../config';
import { httpMethods } from '../constants/http-methods'

const baseApi = new BaseApi({ baseUrl: config.baseUrl });

function getApiGetHandler(action, dispatch) {
	const { payload = {} } = action;
	return (error, value) => {
		if (error) {
			return dispatch(Object.assign({}, payload, { error, type: action.types.failure }));
		}
		dispatch(Object.assign({}, payload, { value, type: action.types.success }));
	};
}

function getApiPostHandler(action, dispatch) {
	const { payload = {} } = action;
	return (error, location) => {
		if (error) {
			return dispatch(Object.assign({}, payload, { error, type: action.types.failure }));
		}
		const id = location.split('/').pop();
		const created = new Date().toISOString();
		const modified = created;
		const value = Object.assign({}, action.data, { id, created, modified });
		dispatch(Object.assign({}, payload, { value, type: action.types.success }));
	};
}

function getApiPutHandler(action, dispatch) {
	const { payload = {} } = action;
	return (error) => {
		if (error) {
			return dispatch(Object.assign({}, payload, { error, type: action.types.failure }));
		}
		const modified = new Date().toISOString();
		const value = Object.assign({}, action.data, { modified });
		dispatch(Object.assign({}, payload, { value, type: action.types.success }));
	};
}

function getApiDeleteHandler(action, dispatch) {
	const { payload = {} } = action;
	return (error) => {
		if (error) {
			return dispatch(Object.assign({}, payload, { error, type: action.types.failure }));
		}
		dispatch(Object.assign({}, payload, { type: action.types.success }));
	};
}

const getApiHandlersByMethod = {
	[httpMethods.GET]: getApiGetHandler,
	[httpMethods.POST]: getApiPostHandler,
	[httpMethods.PUT]: getApiPutHandler,
	[httpMethods.DELETE]: getApiDeleteHandler
};

const apiCallsByMethod = {
	[httpMethods.GET]: (action, token, handler) => baseApi.get(action.path, token, handler),
	[httpMethods.POST]: (action, token, handler) => baseApi.post(action.path, action.data, token, handler),
	[httpMethods.PUT]: (action, token, handler) => baseApi.put(action.path, action.data, token, handler),
	[httpMethods.DELETE]: (action, token, handler) => baseApi.del(action.path, token, handler)
};


export default function callAPIMiddleware({ dispatch, getState }) {
	return next => action => {
		const { types, method = httpMethods.GET, path, payload = {}, shouldCallApi = () => true } = action;

		if (!types) {
			// Normal action: pass it on
			return next(action);
		}
		if (!types.request || !types.success || !types.failure) {
			throw new Error('Missing or invalid request action types!')
		}
		if (!path) {
			throw new Error('Missing or invalid path!')
		}
		if (typeof shouldCallApi !== 'function') {
			throw new Error('Expected shouldCallApi to be a function!')
		}
		if (!shouldCallApi(getState())) {
			return;
		}

		dispatch(Object.assign({}, payload, { type: types.request }));
		
		const token =  'no token'; // getState().postTokens.value.access_token;
		const handler = getApiHandlersByMethod[method](action, dispatch);
		apiCallsByMethod[method](action, token, handler);
	};
}



// TODO: Reset POST/PUT/DELETE results after 10 seconds for successes????