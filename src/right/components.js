import React, { Component } from 'react';
import { Button, Icon } from 'cloud-react';

const divStyle = {
	border: '1px solid red',
	width: '100%',
	minHeight: '300px',
	padding: '10px',
	color: '#666',
	height: 'auto'
};

class View extends Component {

	render() {
		return <div style={divStyle} className={this.props.className}>这是一个div，你可以拖入其他元素{this.props.children}</div>;
	}
};

class Text extends Component {
	render() {
		return <div className={this.props.className}>一段纯文本，不可以拖入其他元素</div>;
	}
}

class Button1 extends Component {
	render() {
		return <Button type="primary" className={this.props.className}>OK</Button>
	}
}

class Icon1 extends Component {
	render() {
		return <Icon type="calendar" style={{ fontSize: '16px', color: '#09a8e6' }} className={this.props.className} />
	}
}

export default { View, Text, Button: Button1, Icon: Icon1 }