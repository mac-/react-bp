import { getInitialState as initialCoursesState } from '../redux/courses'

export function getInitialState() {
	return Object.assign({},
		initialCoursesState()
	);
};