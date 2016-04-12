import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import hook from 'css-modules-electron/register';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import { syncHistory } from 'react-router-redux';

import rootReducer from './redux';
import { getInitialState } from './store/initialState';
import callApiMiddleware from './middleware/call-api-middleware';
import localStorageEnhancer from './store/local-storage-enhancer';

import App from './containers/App';
import Home from './containers/Home';
import CourseList from './containers/CourseList';
import NotFound from './containers/NotFound';

const logger = createLogger();
const historyMiddleware = syncHistory(hashHistory);
const createStoreWithMiddleware = compose(applyMiddleware(thunkMiddleware, callApiMiddleware, logger, historyMiddleware), localStorageEnhancer())(createStore);

const store = createStoreWithMiddleware(rootReducer, getInitialState());
historyMiddleware.listenForReplays(store);

function requireToken(nextState, replace) {
	const state = store.getState();
	// if (!state.postTokens.value) {
	// 	replace({ pathname: '/login', state: { nextPathname: nextState.location.pathname } });
	// }
}

render(
	<Provider store={ store }>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="courses" component={Login} onEnter={requireToken} />
				<Route path="*" component={NotFound}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);