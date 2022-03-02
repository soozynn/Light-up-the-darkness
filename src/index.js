/* eslint-disable no-param-reassign */
// eslint-disable-next-line max-classes-per-file
import platformImage from "./img/platform/platform.png";
import backgroundImage from "./img/background/stage_01.png";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

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
	constructor({ x, y, image }) {
		this.position = {
			x,
			y,
		};

		this.image = image;
		this.width = image.width;
		this.height = image.height;
	}

	draw() {
		ctx.drawImage(this.image, this.position.x, this.position.y);
	}
}

class GenericObject {
	constructor({ x, y, image }) {
		this.position = {
			x,
			y,
		};

		this.image = image;
		this.width = image.width;
		this.height = image.height;
	}

	draw() {
		ctx.drawImage(this.image, this.position.x, this.position.y);
	}
}

function createImage(imageSrc) {
	const image = new Image();
	image.src = platformImage;
	return image;
}

const platformImg = createImage(platformImage);

const player = new Player();
const platforms = [
	new Platform({ x: -1, y: 470, image: platformImg }),
	new Platform({
		x: createImage(platformImage).width - 3,
		y: 470,
		image: platformImg,
	}),
	// new Platform(800, 300, image),
];
const genericObjects = [
	new GenericObject({
		x: 0,
		y: 0,
		image: createImage(backgroundImage),
	}),
];

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
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	padObjects.forEach(padObject => {});
	platforms.forEach(platform => {
		platform.draw();
	});

	player.update();

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
