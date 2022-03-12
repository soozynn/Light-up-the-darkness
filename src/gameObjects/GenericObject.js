export default class GenericObject {
	constructor({ x, y, image, currentLevel }) {
		this.position = {
			x,
			y,
		};

		this.velocity = {
			x: 0,
		};

		this.image = image;
		this.width = image.width;
		this.height = image.height;
		this.currentLevel = currentLevel;
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.position.x, this.position.y);

		if (this.currentLevel) {
			ctx.font = "30px Arial";
			ctx.fillStyle = "black";
			ctx.fillText(`Lv.${this.currentLevel}`, 10, 40);
		}
	}

	update(ctx) {
		this.draw(ctx);
		this.position.x += this.velocity.x;
	}
}
