import TokenSvc from '../services/Token';
import { config } from '../config';

const tokenSvc = new TokenSvc({ baseUrl: config.baseUrl });
 
// Actions
export const INVALIDATE_TOKENS = 'invalidate.tokens';
export const POST_TOKENS = 'post.tokens';
export const POST_TOKENS_SUCCESS = 'post.tokens.success';
export const POST_TOKENS_FAILURE = 'post.tokens.failure';

// Action Creators
export function getInvalidateTokensAction() {
	return { type: INVALIDATE_TOKENS };
}

function getPostTokensAction() {
	return { type: POST_TOKENS };
}

function getPostTokensSuccessAction(data) {
	return { type: POST_TOKENS_SUCCESS, value: data, error: null, lastUpdated: Date.now() };
}

function gePostTokensErrorAction(error) {
	return { type: POST_TOKENS_FAILURE, error: error, lastUpdated: Date.now() };
}

function shouldPostTokens(state) {
	const token = state.postTokens;
	if (token.isLoading) {
		return false;
	}
	return (token.isStale || !token.value);
}

export function postTokensIfNeeded(userName, password) {
	return (dispatch, getState) => {
		if (!shouldPostTokens(getState())) {
			return;
		}
		dispatch(getPostTokensAction());
		const handleGetToken = function(err, result) {
			if (err) {
				return dispatch(gePostTokensErrorAction(err));
			}
			dispatch(getPostTokensSuccessAction(result));
		};
		tokenSvc.getToken(userName, password, handleGetToken);
	};
};

// Initial State
export function getInitialState() {
	return {
		postTokens: {
			isStale: true,
			isLoading: false,
			error: null,
			value: null,
			lastUpdated: null
		}
	};
}

// Reducer
export default function reducer(state = getInitialState().postTokens, action) {
	switch (action.type) {
		case INVALIDATE_TOKENS:
			return Object.assign({}, state, {
				isStale: true
			});
		case POST_TOKENS:
			return Object.assign({}, state, {
				isLoading: true,
				isStale: false,
				error: null	
			});
		case POST_TOKENS_SUCCESS:
			return Object.assign({}, state, {
				isLoading: false,
				isStale: false,
				error: null,
				value: action.value,
				lastUpdated: action.lastUpdated
			});
		case POST_TOKENS_FAILURE:
			return Object.assign({}, state, {
				isLoading: false,
				isStale: false,
				error: action.error,
				value: null,
				lastUpdated: action.lastUpdated
			});
		default:
			return state;
	}
}