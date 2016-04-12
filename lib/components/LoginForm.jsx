import React, { Component } from 'react';

class LoginForm extends Component {

	constructor(props) {
		super(props);
		this.handleLoginAttempt = this.handleLoginAttempt.bind(this);
	}
	
	handleLoginAttempt() {
		this.props.login(this.refs.username.value, this.refs.password.value);
	}
	
	render() {
		const { isLoading, value, error } = this.props.postTokens;
		let formClasses = 'ui form';
		formClasses += (isLoading) ? ' loading' : '';
		formClasses += (error) ? ' error' : '';
		
		return (
			<div className="ui container segment">
				<form className={formClasses}>
					<div className="field">
						<label>User Name</label>
						<input ref="username" type="text" name="user-name" placeholder="User Name"></input>
					</div>
					<div className="field">
						<label>Password</label>
						<input ref="password" type="password" name="password" placeholder="Password"></input>
					</div>
					<div className="ui error message">
						<div className="header">There was a problem</div>
						<p>The credentials you provided were invalid. Please try again.</p>
					</div>
					<a className="ui button" onClick={this.handleLoginAttempt}>Submit</a>
				</form>
			</div>
		)
	}

}

export default LoginForm