import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import courses from './courses'

const rootReducer = combineReducers({
	courses,
	routing: routeReducer
});

export default rootReducer;