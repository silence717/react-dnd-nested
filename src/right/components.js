import React, { Component } from 'react';

const divStyle = {
	border: '1px solid red',
	width: '100%',
	minHeight: '300px',
	height: 'auto'
};

class View extends Component {
	render() {
		return <div style={divStyle}>{this.props.children}</div>;
	}
}

class Text extends Component {
	render() {
		return <span>{this.props.children}</span>;
	}
}

export { View, Text }