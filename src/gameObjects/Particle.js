export default class Particle {
	constructor({ position, velocity, radius }) {
		this.position = {
			x: position.x,
			y: position.y,
		};

		this.velocity = {
			x: velocity.x,
			y: velocity.y,
		};

		this.radius = radius;
		this.timeTheLess = 300;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();
	}

	update(ctx, canvas, gravity) {
		this.timeTheLess--;
		this.draw(ctx);
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.radius + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity * 0.4;
		}
	}
}
