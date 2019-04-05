import React, {Component} from 'react';
import P5Wrapper from 'react-p5-wrapper';

import sketch from './game/gol.js';

import './Body.css';

export default class Body extends Component
{
	constructor(props)
	{
		super(props);
		
		this.state = {
			running: false
		};
	}
	
	render()
	{
		return (
			<div className="body">
				<div className="sketch">
					<P5Wrapper running={this.state.running.toString()} sketch={sketch} />
				</div>
				<div className="settings">
					
				</div>
			</div>
		);
	}
}