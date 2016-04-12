import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { values, get } from 'lodash';
import moment from 'moment';
import styles from './CourseList.css';
import { getCoursesIfNeeded, createCourse, deleteCourse } from '../redux/courses';


class CourseList extends Component {

	constructor(props) {
		super(props);
		this.getCourseList = this.getCourseList.bind(this);
		this.getCourseCard = this.getCourseCard.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(getCoursesIfNeeded());
	}

	getCourseCard(courseId) {
		const course = this.props.getCourses.value[courseId];
		const created = moment(course.created);
		return (
			<div className="card" key={courseId}>
				<div className="content">
					<h3 className="ui header">{course.name}</h3>
					<div className="description">
						<i className="calendar icon"></i>
						Created on: {created.format('M/D/YYYY')}
					</div>
				</div>
				<div className="ui bottom attached two buttons">
					<Link className="ui button" to={`/courses/${course.id}`}>
						<i className="settings icon"></i>
						Manage
					</Link>
				</div>
			</div>
		);
	}

	getCourseList() {
		if (!this.props.getCourses.value) {
			return <div>Loading Courses...</div>;
		}
		const courseIds = Object.keys(this.props.getCourses.value);
		if (courseIds.length && this.props.getRoles.value) {
			return courseIds.map(this.getCourseCard);
		}
	}

	render() {
		if (this.props.children) {
			return (<div>{this.props.children}</div>);
		}
		const loading = this.props.getCourses.isLoading || this.props.getRoles.isLoading;
		return (
			<div className={ (loading) ? 'ui loading container' : 'ui container' }>
				<div className="ui grid">
					<div className="ui cards">
						{this.getCourseList()}
					</div>
				</div>
				<div>{this.props.children}</div>
			</div>
		);
	}
}

CourseList.propTypes = {
	getCourses: PropTypes.object.isRequired
};

CourseList.title = 'Courses';

function mapStateToProps(state) {
	const { courses: { get: getCourses } } = state

	return {
		getCourses
	};
}

export default connect(mapStateToProps)(CourseList);