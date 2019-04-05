export default class Pixel
{
	constructor(p, xi, yi, s)
	{
		this.p = p;
		this.s = s;
		this.x = xi * s;
		this.y = yi * s;
		this.filled = false;
	}
	
	on()
	{
		this.filled = true;
	}
	
	off()
	{
		this.filled = false;
	}
	
	set(on)
	{
		this.filled = on;
	}
	
	isOn()
	{
		return this.filled;
	}
	
	draw()
	{
		if(this.filled)
		{
			this.p.fill(0);
		}
		else
		{
			this.p.fill(255);
		}
		this.p.rect(this.x, this.y, this.s, this.s);
	}
}