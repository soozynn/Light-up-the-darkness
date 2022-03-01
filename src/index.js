/* eslint-disable no-param-reassign */
// eslint-disable-next-line max-classes-per-file
import platformImage from "./img/platform/platform.png";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5;

class Player {
	constructor() {
		this.position = {
			x: 100,
			y: 100,
		};

		this.velocity = {
			x: 0,
			y: 0,
		};
		this.width = 30;
		this.height = 30;
	}

	draw() {
		ctx.fillStyle = "red";
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity;
		} else {
			this.velocity.y = 0;
		}
	}
}

class Platform {
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

const player = new Player();
const platforms = [new Platform(200, 100), new Platform(500, 200), new Platform(800, 300)];

const keys = {
	right: {
		pressed: false,
	},
	left: {
		pressed: false,
	},
};

let scrollOffSet = 0;

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.update();
	platforms.forEach(platform => {
		platform.draw();
	});

	if (keys.right.pressed && player.position.x < 400) {
		player.velocity.x = 5;
	} else if (keys.left.pressed && player.position.x > 100) {
		player.velocity.x = -5;
	} else {
		player.velocity.x = 0;

		if (keys.right.pressed) {
			scrollOffSet += 5;

			platforms.forEach(platform => {
				platform.position.x -= 5;
			});
		} else if (keys.left.pressed) {
			scrollOffSet -= 5;

			platforms.forEach(platform => {
				platform.position.x += 5;
			});
		}
	}

	// 지형 인식
	platforms.forEach(platform => {
		if (
			player.position.y + player.height <= platform.position.y &&
			player.position.y + player.height + player.velocity.y >= platform.position.y &&
			player.position.x + player.width >= platform.position.x &&
			player.position.x <= platform.position.x + platform.width
		) {
			player.velocity.y = 0;
		}
	});

	if (scrollOffSet > 2000) {
		console.log("win");
	}
}

animate();

window.addEventListener("keydown", event => {
	event.preventDefault();

	switch (event.key) {
		case "a":
			console.log("left");
			keys.left.pressed = true;
			break;
		case "d":
			console.log("right");
			keys.right.pressed = true;
			break;
		case "w":
			console.log("up");
			player.velocity.y -= 10;
			break;

		// no default
	}
});

window.addEventListener("keyup", event => {
	event.preventDefault();

	switch (event.key) {
		case "a":
			console.log("left");
			keys.left.pressed = false;
			break;
		case "d":
			console.log("right");
			keys.right.pressed = false;
			break;
		case "w":
			console.log("up");
			player.velocity.y -= 20;
			break;

		// no default
	}
});
