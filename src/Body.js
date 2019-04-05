import React, {Component} from 'react';
import P5Wrapper from 'react-p5-wrapper';

import sketch from './game/gol.js';

import Slider from './Util/Slider';

import './Body.css';

export default class Body extends Component
{
	constructor(props)
	{
		super(props);
		
		this.state = {
			running: false,
			clear: false,
			speed: 1
		};
	}
	
	//DO NOT CALL SETSTATE() OR FORCEUPDATE() HERE
	scriptCallback()
	{
		//We don't update on this reset.
		this.state.clear = false;
	}
	
	render()
	{
		return (
			<div className="body">
				<div className="sketch">
					<P5Wrapper 	sketch={sketch} 
								clear={this.state.clear.toString()}
								running={this.state.running.toString()}
								speed={this.state.speed.toString()}
								callback={()=>this.scriptCallback()}
					/>
				</div>
				<div className="settings">
					<h1>Settings</h1>
					<button type="button" 
							id="toggle"
							active="false"
							onClick={(e)=>{
								this.setState({running: !this.state.running});
							}}>
						{this.state.running ? "Stop" : "Start"}
					</button>
					<button type="reset" 
							id="clear"
							active="false"
							onClick={(e)=>{
								this.setState({clear: true});
							}}>
						Clear
					</button><br />
					<input 	type="range"
							min="1" 
							max="10" 
							value={this.state.speed.toString()}
							className="speedslider"
							onChange={(e)=>{
								this.setState({speed: e.target.value})
							}} />
				</div>
			</div>
		);
	}
}