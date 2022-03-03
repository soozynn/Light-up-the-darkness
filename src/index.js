/* eslint-disable no-param-reassign */
// eslint-disable-next-line max-classes-per-file
import platformImage from "./img/platform/platform.png";
import smallPlatformImage from "./img/platform/smallPlatform.png";
import backgroundImage from "./img/background/stage_01.png";
import doorImage from "./img/door/door.png";

import spriteRunRightrImage from "./img/player/runRight.png";
import spriteRunLeftImage from "./img/player/runLeft.png";
import spriteStandRightImage from "./img/player/rightIdle.png";
import spriteStandLeftImage from "./img/player/leftIdle.png";

import spriteGreenMonster from "./img/monster/walk/green.png";

// import KEY_CODE from "./constants/constants";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const gravity = 0.5;

canvas.width = 1500;
canvas.height = innerHeight;

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

		this.width = 60;
		this.height = 110;

		this.image = createImage(spriteStandRightImage);
		this.frames = 0;
		this.frameSpeed = 0;
		this.staggerFrames = 14;
		this.sprites = {
			stand: {
				right: createImage(spriteStandRightImage),
				left: createImage(spriteStandLeftImage),
				cropWidth: 32,
				width: 64,
			},
			run: {
				right: createImage(spriteRunRightrImage),
				left: createImage(spriteRunLeftImage),
				cropWidth: 32,
				width: 64,
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
		if (this.frameSpeed % this.staggerFrames === 0) {
			this.frames++;

			if (
				(this.frames > 3.5 && this.currentSprite === this.sprites.stand.right) ||
				this.currentSprite === this.sprites.stand.left
			) {
				this.frames = 0;
			}

			if (
				(this.frames > 5.5 && this.currentSprite === this.sprites.run.right) ||
				this.currentSprite === this.sprites.run.left
			) {
				this.frames = 0;
			}
		}

		this.frameSpeed++;
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

class Background {
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

class Door {
	constructor({ x, y, image, width, height }) {
		this.position = {
			x,
			y,
		};

		this.image = image;
		this.width = width;
		this.height = height;
	}

	draw() {
		ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
}

class Monster {
	constructor({ position, velocity }) {
		this.position = {
			x: position.x,
			y: position.y,
		};

		this.velocity = {
			x: velocity.x,
			y: velocity.y,
		};

		this.width = 100;
		this.height = 110;

		this.image = createImage(spriteGreenMonster);
		this.frames = 0;
		this.frameSpeed = 0;
		this.staggerFrames = 16;
	}

	draw() {
		ctx.drawImage(
			this.image,
			370 * this.frames,
			0,
			370,
			360,
			this.position.x,
			this.position.y,
			this.width,
			this.height,
		);
	}

	update() {
		if (this.frameSpeed % this.staggerFrames === 0) {
			this.frames++;

			if (this.frames > 5) {
				this.frames = 0;
			}
		}

		this.frameSpeed++;
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity;
		}
	}
}

function createImage(imageSrc) {
	const image = new Image();
	image.src = imageSrc;
	return image;
}

function createImageAsync(imageSrc) {
	return new Promise(resolve => {
		const image = new Image();
		image.onload = () => {
			resolve(image);
		};

		image.src = imageSrc;
	});
}

let platformImg = createImage(platformImage);
let smallPlatformImg;

let player = new Player();
let platforms = [];
let genericObjects = [];
let monsters = [];

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

function isOnTopOfPlatform({ object, platform }) {
	return (
		object.position.y + object.height <= platform.position.y &&
		object.position.y + object.height + object.velocity.y >= platform.position.y &&
		object.position.x + object.width >= platform.position.x &&
		object.position.x <= platform.position.x + platform.width
	);
}

function killMoster({ object1, object2 }) {
	return (
		object1.position.y + object1.height <= object2.position.y &&
		object1.position.y + object1.height + object1.velocity.y >= object2.position.y &&
		object1.position.x + object1.width >= object2.position.x &&
		object1.position.x <= object2.position.x + object2.width
	);
}

async function init() {
	platformImg = await createImageAsync(platformImage);
	smallPlatformImg = await createImageAsync(smallPlatformImage);

	player = new Player();
	monsters = [
		new Monster({
			position: {
				x: 800,
				y: 100,
			},
			velocity: {
				x: -0.3,
				y: 0,
			},
		}),
	];

	platforms = [
		new Platform({
			x: platformImg.width * 4 + 300 - 2 + platformImg.width - smallPlatformImg.width,
			y: 270,
			image: smallPlatformImg,
		}),
		new Platform({ x: -1, y: 742, image: platformImg }),
		new Platform({
			x: platformImg.width - 3,
			y: 470,
			image: platformImg,
		}),
		new Platform({ x: platformImg.width * 2 + 100, y: 470, image: platformImg }),
		new Platform({ x: platformImg.width * 3 + 300, y: 470, image: platformImg }),
		new Platform({ x: platformImg.width * 5 + 680 - 2, y: 470, image: platformImg }),
		new Platform({ x: platformImg.width * 6 + 680 - 2, y: 480, image: platformImg }),
		new Door({
			x: platformImg.width * 7 + 680 - 2,
			y: 480,
			image: createImage(doorImage),
			width: 250,
			height: 280,
		}),
	];
	genericObjects = [
		new Background({
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
	monsters.forEach((monster, index) => {
		monster.update();

		if (killMoster({ object1: player, object2: monster })) {
			player.velocity.y -= 40;

			setTimeout(() => {
				monsters.splice(index, 1);
			}, 0);
		} else if (
			player.position.x + player.width >= monster.position.x &&
			player.position.y + player.height >= monster.position.y &&
			player.position.x <= monster.position.x + monster.width
		) {
			init();
		}
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
			scrollOffSet += player.speed;

			platforms.forEach(platform => {
				platform.position.x -= player.speed;
			});
			monsters.forEach(monster => {
				monster.position.x -= player.speed;
			});
		} else if (keys.left.pressed && scrollOffSet > 0) {
			scrollOffSet -= player.speed;

			platforms.forEach(platform => {
				platform.position.x += player.speed;
			});
			monsters.forEach(monster => {
				monster.position.x += player.speed;
			});
		}
	}

	// 지형 인식
	platforms.forEach(platform => {
		if (isOnTopOfPlatform({ object: player, platform })) {
			player.velocity.y = 0;
		}

		monsters.forEach(monster => {
			if (isOnTopOfPlatform({ object: monster, platform })) {
				monster.velocity.y = 0;
			}
		});
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

	if (platformImg && scrollOffSet > 2000) {
		console.log("win");
		// 게임 오버 함수 띄우기
	}

	if (player.position.y > canvas.height) {
		init();
	}
}

init();
animate();

addEventListener("keydown", event => {
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

addEventListener("keyup", event => {
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
