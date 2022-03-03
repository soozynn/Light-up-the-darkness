export default class Platform {
	constructor(x, y) {
		this.position = {
			x,
			y,
		};

		this.width = 200;
		this.height = 20;
	}

	draw() {
		ctx.fillStyle = "blue";
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}
