export default class Platform {
	constructor({ x, y, image, block }) {
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
		this.block = block;
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.position.x, this.position.y);
	}

	update(ctx) {
		this.draw(ctx);
		this.position.x += this.velocity.x;
	}
}
