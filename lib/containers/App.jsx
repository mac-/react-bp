import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './App.css';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.buildBreadCrumb = this.buildBreadCrumb.bind(this);
		this.routeParts = [];
	}

	buildBreadCrumb() {
		const breadCrumbPieces = this.props.routes.filter(route => route.hasOwnProperty('title'));
		if (!breadCrumbPieces.length) {
			return <div></div>;
		}
		let lastPiece = breadCrumbPieces.pop();
		lastPiece = <div className="active section">{lastPiece.title}</div>;

		const paths = [];
		let previous = '';
		let current = '';
		const paramRegex = /:(\w+)(\/|$)/;
		for (let i = 0; i < breadCrumbPieces.length; i++) {
			const path = breadCrumbPieces[i].path;
			const matches = path.match(paramRegex);
			if (matches && matches.length) {
				current = '/' + path.replace(paramRegex, this.props.params[matches[1]] + '$2');
			}
			else {
				current = `/${path}`;
			}
			paths.push(previous + current);
			previous = current;
		}
		return (
			<div className="ui huge breadcrumb">
				{breadCrumbPieces.map((route, index) => <span key={route.path}><Link to={paths[index]} className="section">{route.title}</Link><i className="right chevron icon divider"></i></span>)}
				{lastPiece}
			</div>
		)
	}

	render() {
		return (
		<div>
			<div className="ui inverted menu">
				<div className="header item">Title goes here</div>
				<div className="right menu">
				</div>
			</div>
			<div className="ui basic segment">
				{this.buildBreadCrumb()}
			</div>
			<div className={styles.container}>
				{this.props.children}
			</div>
		</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.element.isRequired
};

App.contextTypes = {
	router: PropTypes.object.isRequired
};
