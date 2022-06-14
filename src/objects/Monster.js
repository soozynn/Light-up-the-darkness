export default class Monster {
	constructor({
		position,
		velocity,
		image,
		distance = {
			limit: 50,
			traveled: 0,
		},
	}) {
		this.position = {
			x: position.x,
			y: position.y,
		};

		this.velocity = {
			x: velocity.x,
			y: velocity.y,
		};

		this.width = 60;
		this.height = 90;

		this.image = image;
		this.frames = 0;
		this.frameSpeed = 0;
		this.staggerFrames = 14;

		this.distance = distance;
	}

	draw(ctx) {
		ctx.drawImage(
			this.image,
			225 * this.frames,
			0,
			225,
			290,
			this.position.x,
			this.position.y,
			this.width,
			this.height,
		);
	}

	update(ctx, gravity, canvas) {
		if (this.frameSpeed % this.staggerFrames === 0) {
			this.frames++;

			if (this.frames > 3.5) {
				this.frames = 0;
			}
		}

		this.frameSpeed++;
		this.draw(ctx);
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity;
			this.distance.traveled += Math.abs(this.velocity.x);

			if (this.distance.traveled > this.distance.limit) {
				this.distance.traveled = 0;
				this.velocity.x = -this.velocity.x;
			}
		}
	}
}
