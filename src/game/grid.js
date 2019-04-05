import Pixel from './pixel';
import { isNull } from 'util';

export default class Grid
{
	constructor(p)
	{
		this.p = p;
		
		this.ts = 20;
		
		this.mousePressed = false;
		this.tilesPressed = [];
		
		this.tiles = new Array(500 / this.ts);
		for(let i = 0; i < this.tiles.length; ++i)
		{
			this.tiles[i] = new Array(1000 / this.ts);
			for(let j = 0; j < this.tiles[i].length; ++j)
			{
				this.tiles[i][j] = new Pixel(p, j, i, this.ts);
			}
		}
		
		this.newGrid = new Array(500 / this.ts);
		for(let i = 0; i < this.newGrid.length; ++i)
		{
			this.newGrid[i] = new Array(1000 / this.ts);
			for(let j = 0; j < this.newGrid[i].length; ++j)
			{
				this.newGrid[i][j] = false;
			}
		}
	}
	
	updateMouse()
	{
		let isPairInPressed = (tx, ty) => {
			for(let arr of this.tilesPressed)
			{
				if(arr[0] === tx && arr[1] === ty)
				{
					return true;
				}
			}
			return false;
		}
		if(this.mousePressed)
		{
			let x = this.p.mouseX;
			let y = this.p.mouseY;
			let tx = Math.floor(x / this.ts);
			let ty = Math.floor(y / this.ts);
			
			if(!isPairInPressed(tx, ty))
			{
				this.tilesPressed.push([tx, ty]);
				this.tiles[ty][tx].set(!this.tiles[ty][tx].isOn());
			}
		}
		else
		{
			this.tilesPressed = [];
		}
	}
	
	update()
	{
		for(let y = 0; y < this.tiles.length; ++y)
		{
			for(let x = 0; x < this.tiles[0].length; ++x)
			{
				let grid = [
					[-1,-1],[0,-1],[1,-1],
					[-1,0],/*0,0,*/[1,0],
					[-1,1],[0,1],[1,1]
				];
				
				let pixels = grid.map((c)=>{
					let xc = x + c[0];
					let yc = y + c[1];
					if(xc < 0 || xc >= this.tiles[0].length ||
						yc < 0 || yc >= this.tiles.length)
					{
						return null;
					}
					return this.tiles[y+c[1]][x+c[0]].isOn();
				});
				
				let cpixel = this.tiles[y][x].isOn();
				
				let aliveCount = 0;
				
				for(let pixel of pixels)
				{
					if(!isNull(pixel) && pixel)
					{
						aliveCount++;
					}
				}
				
				if(cpixel)
				{
					this.newGrid[y][x] = !(aliveCount < 2 || aliveCount > 3);
				}
				else
				{
					this.newGrid[y][x] = (aliveCount === 3);
				}
			}
		}
		for(let i = 0; i < this.tiles.length; ++i)
		{
			for(let j = 0; j < this.tiles[i].length; ++j)
			{
				this.tiles[i][j].set(this.newGrid[i][j]);
			}
		}
	}
	
	on(x, y)
	{
		this.tiles[y][x].on();
	}
	
	off(x, y)
	{
		this.tiles[y][x].off();
	}
	
	clear()
	{
		for(let y = 0; y < this.tiles.length; ++y)
		{
			for(let x = 0; x < this.tiles[0].length; ++x)
			{
				this.tiles[y][x].off();
			}
		}
	}
	
	draw()
	{
		for(let y = 0; y < this.tiles.length; ++y)
		{
			for(let x = 0; x < this.tiles[0].length; ++x)
			{
				this.tiles[y][x].draw();
			}
		}
	}
}