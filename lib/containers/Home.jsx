import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class Home extends Component {
	render() {
		return (
		<div>
			<div className="ui container segment">
				<h2>Welcome to React BP</h2>
				<Link to="/courses">Click here to see a list of courses</Link>
			</div>
		</div>
		);
	}
}