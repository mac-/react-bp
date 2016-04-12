import { combineReducers } from 'redux';
import { httpMethods } from '../constants/http-methods'
import createReducer, { getInitialStatesByMethod } from './utils/create-reducer'
 
// Action Types
export const INVALIDATE_COURSES = 'invalidate.courses';
export const GET_COURSES = 'get.courses';
export const GET_COURSES_SUCCESS = 'get.courses.success';
export const GET_COURSES_FAILURE = 'get.courses.failure';
export const CREATE_COURSE = 'create.course';
export const CREATE_COURSE_SUCCESS = 'create.course.success';
export const CREATE_COURSE_FAILURE = 'create.course.failure';
export const UPDATE_COURSE = 'update.course';
export const UPDATE_COURSE_SUCCESS = 'update.course.success';
export const UPDATE_COURSE_FAILURE = 'update.course.failure';
export const DELETE_COURSE = 'delete.course';
export const DELETE_COURSE_SUCCESS = 'delete.course.success';
export const DELETE_COURSE_FAILURE = 'delete.course.failure';

// Action Creators
export function getInvalidateCoursesAction() {
	return { type: INVALIDATE_COURSES };
}

function shouldGetCourses(state) {
	const { courses: { get: getCourses } } = state;
	if (getCourses.isLoading) {
		return false;
	}
	return (getCourses.isStale || !getCourses.value);
}

export function getCoursesIfNeeded() {
	return {
		types: { request: GET_COURSES, success: GET_COURSES_SUCCESS, failure: GET_COURSES_FAILURE },
		shouldCallApi: shouldGetCourses, 
		method: 'GET',
		path: `/courses`
	}
}

export function createCourse(data) {
	return {
		types: { request: CREATE_COURSE, success: CREATE_COURSE_SUCCESS, failure: CREATE_COURSE_FAILURE },
		method: 'POST',
		path: `/courses`,
		data
	}
}

export function updateCourse(data) {
	return {
		types: { request: UPDATE_COURSE, success: UPDATE_COURSE_SUCCESS, failure: UPDATE_COURSE_FAILURE },
		method: 'PUT',
		path: `/courses/${payload.id}`,
		data,
		payload: { id: data.id }
	}
}

export function deleteCourse(id) {
	return {
		types: { request: DELETE_COURSE, success: DELETE_COURSE_SUCCESS, failure: DELETE_COURSE_FAILURE },
		method: 'DELETE',
		path: `/courses/${id}`,
		payload: { id }
	}
}

// Initial State
export function getInitialState() {
	return {
		courses: {
			create: getInitialStatesByMethod[httpMethods.POST](),
			get: getInitialStatesByMethod[httpMethods.GET](),
			update: getInitialStatesByMethod[httpMethods.PUT](),
			del: getInitialStatesByMethod[httpMethods.DELETE]()
		}
	};
}

// Reducers
const coursesReducer = combineReducers({
	create: createReducer(httpMethods.POST, {
		request: CREATE_COURSE,
		success: CREATE_COURSE_SUCCESS,
		failure: CREATE_COURSE_FAILURE
	}),
	get: createReducer(httpMethods.GET, {
		request: GET_COURSES,
		success: GET_COURSES_SUCCESS,
		failure: GET_COURSES_FAILURE,
		invalidate: INVALIDATE_COURSES,
		create: CREATE_COURSE_SUCCESS,
		update: UPDATE_COURSE_SUCCESS,
		del: DELETE_COURSE_SUCCESS
	}),
	update: createReducer(httpMethods.PUT, {
		request: UPDATE_COURSE,
		success: UPDATE_COURSE_SUCCESS,
		failure: UPDATE_COURSE_FAILURE
	}),
	del: createReducer(httpMethods.DELETE, {
		request: DELETE_COURSE,
		success: DELETE_COURSE_SUCCESS,
		failure: DELETE_COURSE_FAILURE
	})
});

export default coursesReducer;
