import Grid from './grid';

export default function sketch(p)
{
	let grid = new Grid(p);
	let running = false;
	
	p.setup = () => {
		p.createCanvas(1000, 500);
		p.frameRate(60);
		
		grid.on(3, 3);
		grid.on(4, 3);
		//grid.on(4, 4);
		grid.on(3, 4);
	};
	p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
		running = (props.running === "true");
	};
	p.draw = () => {
		p.background(255);
		if(running)
		{
			grid.update();
		}
		grid.draw();
	};
};