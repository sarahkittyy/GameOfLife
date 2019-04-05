import Grid from './grid';

export default function sketch(p)
{
	let grid = new Grid(p);
	let running = false;
	let speed = 1;
	let frameCount = 0;
	
	p.setup = () => {
		p.createCanvas(1000, 500);
		p.frameRate(60);
		
		for(let i = 0; i < 10; ++i){
			grid.on(i+10, 10);}
	};
	p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
		running = (props.running === "true");
		if(props.clear === "true")
		{
			grid.clear();
		}
		speed = parseInt(props.speed);
		props.callback();
	};
	p.mousePressed = () => {
		grid.mousePressed = true;
	};
	p.mouseReleased = () => {
		grid.mousePressed = false;
	};
	p.draw = () => {
		p.background(255);
		grid.updateMouse();
		frameCount++;
		if(running && frameCount >= (10 / speed))
		{
			frameCount = 0;
			grid.update();
		}
		grid.draw();
	};
};