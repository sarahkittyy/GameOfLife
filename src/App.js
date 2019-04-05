import React, {Component} from 'react';
import './App.css';

import Body from './Body';

export default class App extends Component 
{
	constructor(props)
	{
		super(props);
	}
	
	render()
	{
		return (
			<div className="main">
				<h1 id="title">Game Of Life!</h1>
				<Body />
			</div>
		);
	}
}