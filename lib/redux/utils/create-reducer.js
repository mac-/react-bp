import assert from 'assert';
import { keyBy, omit } from 'lodash';
import { httpMethods } from '../../constants/http-methods';
//import Store from 'localstorage-ns';

const defaultGetState = { isLoading: false, isStale: true, value: null, lastUpdated: null, error: null };
const defaultModifyState = { id: null, isLoading: false, succeeded: false, lastUpdated: null, error: null };

export const getInitialStatesByMethod = {
	[httpMethods.GET]: (key) => { return defaultGetState; },
	[httpMethods.POST]: (key) => { return defaultModifyState; },
	[httpMethods.PUT]: (key) => { return defaultModifyState; },
	[httpMethods.DELETE]: (key) => { return defaultModifyState; }
}

function reduceGetRequestAction(state, action) {
	return Object.assign({}, state, { isLoading: true, isStale: false, error: null });
}

function reduceGetRequestSuccessAction(state, action) {
	return Object.assign({}, state, { isLoading: false, isStale: false, error: null, value: keyBy(action.value, 'id'), lastUpdated: Date.now() });
}

function reduceGetRequestFailureAction(state, action) {
	return Object.assign({}, state, { isLoading: false, error: action.error, value: null, lastUpdated: Date.now() });
}

function reduceGetRequestInvalidateAction(state, action) {
	return Object.assign({}, state, { isStale: true });
}

function reduceGetRequestCreateAction(state, action) {
	return Object.assign({}, state, { isStale: true, value: Object.assign({}, state.value, { [action.value.id]: action.value }) });
}

function reduceGetRequestUpdateAction(state, action) {
	return Object.assign({}, state, { isStale: true, value: Object.assign({}, state.value, { [action.value.id]: action.value }) });
}

function reduceGetRequestDeleteAction(state, action) {
	return Object.assign({}, state, { isStale: true, value: omit(state.value, action.id) });
}

function reduceCreateRequestAction(state, action) {
	return Object.assign({}, state, { id: null, isLoading: true, succeeded: false, error: null });
}

function reduceCreateRequestSuccessAction(state, action) {
	return Object.assign({}, state, { id: action.value.id, isLoading: false, succeeded: true, error: null, lastUpdated: Date.now() });
}

function reduceCreateRequestFailureAction(state, action) {
	return Object.assign({}, state, { id: null, isLoading: false, succeeded: false, error: action.error, lastUpdated: Date.now() });
}

function reduceUpdateRequestAction(state, action) {
	return Object.assign({}, state, { id: action.id, isLoading: true, succeeded: false, error: null });
}

function reduceUpdateRequestSuccessAction(state, action) {
	return Object.assign({}, state, { isLoading: false, succeeded: true, error: null, lastUpdated: Date.now() });
}

function reduceUpdateRequestFailureAction(state, action) {
	return Object.assign({}, state, { isLoading: false, succeeded: false, error: action.error, lastUpdated: Date.now() });
}

function reduceDeleteRequestAction(state, action) {
	return Object.assign({}, state, { id: action.id, isLoading: true, succeeded: false, error: null });
}

function reduceDeleteRequestSuccessAction(state, action) {
	return Object.assign({}, state, { isLoading: false, succeeded: true, error: null, lastUpdated: Date.now() });
}

function reduceDeleteRequestFailureAction(state, action) {
	return Object.assign({}, state, { isLoading: false, succeeded: false, error: action.error, lastUpdated: Date.now() });
}

const reducersByMethod = {
	[httpMethods.GET]: {
		request: reduceGetRequestAction,
		success: reduceGetRequestSuccessAction,
		failure: reduceGetRequestFailureAction,
		invalidate: reduceGetRequestInvalidateAction,
		create: reduceGetRequestCreateAction, 
		update: reduceGetRequestUpdateAction,
		del: reduceGetRequestDeleteAction,
	},
	[httpMethods.POST]: {
		request: reduceCreateRequestAction,
		success: reduceCreateRequestSuccessAction,
		failure: reduceCreateRequestFailureAction
	},
	[httpMethods.PUT]: {
		request: reduceUpdateRequestAction,
		success: reduceUpdateRequestSuccessAction,
		failure: reduceUpdateRequestFailureAction
	},
	[httpMethods.DELETE]: {
		request: reduceDeleteRequestAction,
		success: reduceDeleteRequestSuccessAction,
		failure: reduceDeleteRequestFailureAction
	}
};

export default function createReducer(method, actionTypes) {
	assert(Object.keys(httpMethods).indexOf(method) >= 0, `Invalid type: ${method}`);
	
	const reducersByActionType = {
		[actionTypes.request]: reducersByMethod[method].request,
		[actionTypes.success]: reducersByMethod[method].success,
		[actionTypes.failure]: reducersByMethod[method].failure
	};
	if (method === httpMethods.GET) {
		Object.assign(reducersByActionType, {
			[actionTypes.invalidate]: reducersByMethod[method].invalidate,
			[actionTypes.create]: reducersByMethod[method].create,
			[actionTypes.update]: reducersByMethod[method].update,
			[actionTypes.del]: reducersByMethod[method].del
		})
	}
	const initialState = getInitialStatesByMethod[method]();
	return (state = initialState, action) => {
		if (!reducersByActionType[action.type]) {
			return state;
		}
		return reducersByActionType[action.type](state, action);
	};
}