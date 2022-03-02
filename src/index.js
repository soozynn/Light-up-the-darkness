/* eslint-disable no-param-reassign */
// eslint-disable-next-line max-classes-per-file
import platformImage from "./img/platform/platform.png";
import smallPlatformImage from "./img/platform/smallPlatform.png";
import backgroundImage from "./img/background/stage_01.png";
import spriteRunRightrImage from "./img/player/runRight.png";
import spriteRunLeftImage from "./img/player/runLeft.png";
import spriteStandRightImage from "./img/player/rightIdle.png";
import spriteStandLeftImage from "./img/player/leftIdle.png";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const gravity = 0.5;

canvas.width = 1024;
canvas.height = 576;

class Player {
	constructor() {
		this.speed = 4;
		this.position = {
			x: 100,
			y: 100,
		};

		this.velocity = {
			x: 0,
			y: 0,
		};
		this.width = 65;
		this.height = 130;

		this.image = createImage(spriteStandRightImage);
		this.frames = 0;
		this.sprites = {
			stand: {
				right: createImage(spriteStandRightImage),
				left: createImage(spriteStandLeftImage),
				cropWidth: 32,
				width: 65,
			},
			run: {
				right: createImage(spriteRunRightrImage),
				left: createImage(spriteRunLeftImage),
				cropWidth: 64,
				width: 32,
			},
		};

		this.currentSprite = this.sprites.stand.right;
		this.currentCropWidth = 32;
	}

	draw() {
		ctx.drawImage(
			this.currentSprite,
			this.currentCropWidth * this.frames,
			0,
			this.currentCropWidth,
			32,
			this.position.x,
			this.position.y,
			this.width,
			this.height,
		);
	}

	update() {
		this.frames++;

		if (
			(this.frames > 4 && this.currentSprite === this.sprites.stand.right) ||
			this.currentSprite === this.sprites.stand.left
		) {
			this.frames = 0;
		} else if (
			(this.frames > 5 && this.currentSprite === this.sprites.run.right) ||
			this.currentSprite === this.sprites.run.left
		) {
			this.frames = 0;
		}

		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity;
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
	image.src = imageSrc;
	return image;
}

let platformImg = createImage(platformImage);
const smallPlatformImg = createImage(smallPlatformImage);

let player = new Player();
let platforms = [];
let genericObjects = [];
let lastKey;

const keys = {
	right: {
		pressed: false,
	},
	left: {
		pressed: false,
	},
};

let scrollOffSet = 0;

function init() {
	platformImg = createImage(platformImage);

	player = new Player();
	platforms = [
		new Platform({
			x: platformImg.width * 4 + 300 - 2 + platformImg.width - smallPlatformImg.width,
			y: 270,
			image: smallPlatformImg,
		}),
		new Platform({ x: -1, y: 470, image: platformImg }),
		new Platform({
			x: createImage(platformImage).width - 3,
			y: 470,
			image: platformImg,
		}),
		new Platform({ x: platformImg.width * 2 + 100, y: 470, image: platformImg }),
		new Platform({ x: platformImg.width * 3 + 300, y: 470, image: platformImg }),
		new Platform({ x: platformImg.width * 5 + 680 - 2, y: 470, image: platformImg }),
	];
	genericObjects = [
		new GenericObject({
			x: -1,
			y: -1,
			image: createImage(backgroundImage),
		}),
	];

	scrollOffSet = 0;
}

function animate() {
	requestAnimationFrame(animate);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	genericObjects.forEach(genericObject => {
		genericObject.draw();
	});
	platforms.forEach(platform => {
		platform.draw();
	});

	player.update();

	if (keys.right.pressed && player.position.x < 400) {
		player.velocity.x = player.speed;
	} else if (
		(keys.left.pressed && player.position.x > 100) ||
		(keys.left.pressed && scrollOffSet === 0 && player.position.x > 0)
	) {
		player.velocity.x = -player.speed;
	} else {
		player.velocity.x = 0;

		if (keys.right.pressed) {
			scrollOffSet += 5;

			platforms.forEach(platform => {
				platform.position.x -= player.speed;
			});
		} else if (keys.left.pressed && scrollOffSet > 0) {
			scrollOffSet -= player.speed;

			platforms.forEach(platform => {
				platform.position.x += player.speed;
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

	if (
		keys.right.pressed &&
		lastKey === "right" &&
		player.currentSprite !== player.sprites.run.right
	) {
		player.frames = 1;
		player.currentSprite = player.sprites.run.right;
		player.currentCropWidth = player.sprites.run.cropWidth;
		player.width = player.sprites.run.width;
	}

	if (keys.left.pressed && lastKey === "left" && player.currentSprite !== player.sprites.run.left) {
		player.currentSprite = player.sprites.run.left;
		player.currentCropWidth = player.sprites.run.cropWidth;
		player.width = player.sprites.run.width;
	}

	if (
		!keys.left.pressed &&
		lastKey === "left" &&
		player.currentSprite !== player.sprites.stand.left
	) {
		player.currentSprite = player.sprites.stand.left;
		player.currentCropWidth = player.sprites.stand.cropWidth;
		player.width = player.sprites.stand.width;
	}

	if (
		!keys.right.pressed &&
		lastKey === "right" &&
		player.currentSprite !== player.sprites.stand.right
	) {
		player.currentSprite = player.sprites.stand.right;
		player.currentCropWidth = player.sprites.stand.cropWidth;
		player.width = player.sprites.stand.width;
	}

	if (scrollOffSet > 2000) {
		console.log("win");
		// 승리 모달 띄우기
	}

	if (player.position.y > canvas.height) {
		init();
	}
}

init();
animate();

window.addEventListener("keydown", event => {
	switch (event.key) {
		case "a":
			keys.left.pressed = true;
			lastKey = "left";
			break;

		case "d":
			keys.right.pressed = true;
			lastKey = "right";
			break;

		case "w":
			player.velocity.y -= 15;
			break;

		// no default
	}
});

window.addEventListener("keyup", event => {
	switch (event.key) {
		case "a":
			keys.left.pressed = false;
			break;

		case "d":
			keys.right.pressed = false;
			break;

		case "w":
			break;

		// no default
	}
});
