/* eslint-disable no-param-reassign */
// eslint-disable-next-line max-classes-per-file
import gsap from "gsap";

import Player from "../gameObjects/Player";
import Platform from "../gameObjects/Platform";
import GenericObject from "../gameObjects/GenericObject";
import Monster from "../gameObjects/Monster";

import platformImage from "../img/platform/platform.png";
import smallPlatformImage from "../img/platform/smallPlatform.png";
import backgroundImage from "../img/background/stage_01.png";
import obstacleImage from "../img/obstacle/obstacle.png";
import flagImage from "../img/flag/flag.png";

import spriteGreenMonster from "../img/monster/walk/walkGreen.png";
import spriteBrownMonster from "../img/monster/walk/walkBrown.png";

// import { audio } from "./js/audio";
import { images } from "./image";
import {
	isOnTopOfPlatform,
	collisionTop,
	isOnTopOfPlatformCircle,
	createImage,
	createImageAsync,
	hitBottomOfPlatform,
	hitSideOfPlatform,
	objectsTouch,
} from "./utils";

// import KEY_CODE from "./constants/constants";
// audio.stage1.play();
console.log(images);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const gravity = 1.5;

canvas.width = 1024;
canvas.height = innerHeight;

class Particle {
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

	draw() {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();
	}

	update() {
		this.timeTheLess--;
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.radius + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity * 0.4;
		}
	}
}

let platformImg = createImage(platformImage);
let smallPlatformImg;
let obstacleImg;

let player = new Player(createImage);
let platforms = [];
let genericObjects = [];
let monsters = [];
let particles = [];

let lastKey;
let keys;

let scrollOffSet;
let flag;
let flagImg;
let game;

async function initLevel1() {
	player = new Player();
	keys = {
		right: {
			pressed: false,
		},
		left: {
			pressed: false,
		},
	};
	scrollOffSet = 0;

	game = {
		disableUserInput: false,
	};

	platformImg = await createImageAsync(platformImage);
	smallPlatformImg = await createImageAsync(smallPlatformImage);
	obstacleImg = await createImageAsync(obstacleImage);
	flagImg = await createImageAsync(flagImage);

	flag = new GenericObject({
		x: 6900 + 600,
		y: canvas.height - platformImg.height - flagImg.height,
		image: flagImg,
	});
	player = new Player(createImage);
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
			image: createImage(spriteGreenMonster),
			distance: {
				limit: 200,
				traveled: 0,
			},
		}),
		new Monster({
			position: {
				x: 1600,
				y: 100,
			},
			velocity: {
				x: -0.3,
				y: 0,
			},
			image: createImage(spriteBrownMonster),
			distance: {
				limit: 100,
				traveled: 0,
			},
		}),
	];

	particles = [];
	platforms = [
		new Platform({
			x: platformImg.width * 4 + 200 + platformImg.width - smallPlatformImg.width,
			y: 270,
			image: smallPlatformImg,
			block: true,
		}),
		new Platform({ x: -1, y: 742, image: platformImg, block: true }),
		new Platform({
			x: platformImg.width - 3,
			y: 742,
			image: platformImg,
			block: true,
		}),
		new Platform({ x: platformImg.width * 2 + 100, y: 742, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 300, y: 470, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 480, y: 470, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 6 + 580, y: 742, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 680, y: 142, image: smallPlatformImg, block: true }),
		new Platform({ x: 600, y: -100, image: obstacleImg, block: true }),
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

async function initLevel2() {
	player = new Player();
	keys = {
		right: {
			pressed: false,
		},
		left: {
			pressed: false,
		},
	};
	scrollOffSet = 0;

	game = {
		disableUserInput: false,
	};

	platformImg = await createImageAsync(platformImage);
	smallPlatformImg = await createImageAsync(smallPlatformImage);
	obstacleImg = await createImageAsync(obstacleImage);
	flagImg = await createImageAsync(flagImage);

	flag = new GenericObject({
		x: 6900 + 600,
		y: canvas.height - platformImg.height - flagImg.height,
		image: flagImg,
	});
	player = new Player(createImage);
	monsters = [];
	particles = [];
	platforms = [new Platform({ x: -1, y: 742, image: platformImg, block: true })];
	genericObjects = [
		new GenericObject({
			x: -1,
			y: -1,
			image: createImage(backgroundLevel2),
		}),
	];

	scrollOffSet = 0;
}

async function initLevel3() {
	player = new Player();
	keys = {
		right: {
			pressed: false,
		},
		left: {
			pressed: false,
		},
	};
	scrollOffSet = 0;

	game = {
		disableUserInput: false,
	};

	platformImg = await createImageAsync(platformImage);
	smallPlatformImg = await createImageAsync(smallPlatformImage);
	obstacleImg = await createImageAsync(obstacleImage);
	flagImg = await createImageAsync(flagImage);

	flag = new GenericObject({
		x: 100,
		y: canvas.height - platformImg.height - flagImg.height,
		image: flagImg,
	});
	player = new Player(createImage);
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
			image: createImage(spriteGreenMonster),
			distance: {
				limit: 200,
				traveled: 0,
			},
		}),
		new Monster({
			position: {
				x: 1600,
				y: 100,
			},
			velocity: {
				x: -0.3,
				y: 0,
			},
			image: createImage(spriteBrownMonster),
			distance: {
				limit: 100,
				traveled: 0,
			},
		}),
	];

	particles = [];
	platforms = [
		new Platform({
			x: platformImg.width * 4 + 200 + platformImg.width - smallPlatformImg.width,
			y: 270,
			image: smallPlatformImg,
			block: true,
		}),
		new Platform({ x: -1, y: 742, image: platformImg, block: true }),
		new Platform({
			x: platformImg.width - 3,
			y: 742,
			image: platformImg,
			block: true,
		}),
		new Platform({ x: platformImg.width * 2 + 100, y: 742, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 300, y: 470, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 480, y: 470, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 6 + 580, y: 742, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 680, y: 142, image: smallPlatformImg, block: true }),
		new Platform({ x: 600, y: -100, image: obstacleImg, block: true }),
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
		genericObject.update(ctx);
		genericObject.velocity.x = 0;
	});

	platforms.forEach(platform => {
		platform.update(ctx);
		platform.velocity.x = 0;
	});

	if (flag) {
		flag.update(ctx);
		flag.velocity.x = 0;

		if (
			objectsTouch({
				object1: player,
				object2: flag,
			})
		) {
			game.disableUserInput = true;
			player.velocity.x = 0;
			player.velocity.y = 0;
			player.currentSprite = player.sprites.stand.right;

			gsap.to(player.position, {
				y: canvas.height - platformImg.height - player.height,
				duration: 1,
			});
		}
	}

	monsters.forEach((monster, index) => {
		monster.update(ctx, gravity, canvas);

		if (collisionTop({ object1: player, object2: monster })) {
			for (let i = 0; i < 50; i++) {
				particles.push(
					new Particle({
						position: {
							x: monster.position.x + monster.width / 2,
							y: monster.position.y + monster.height / 2,
						},
						velocity: {
							x: (Math.random() - 0.5) * 5,
							y: (Math.random() - 0.5) * 10,
						},
						radius: Math.random() * 3,
					}),
				);
			}

			player.velocity.y -= 20;
			// audio.monsterSquash.play();

			setTimeout(() => {
				monsters.splice(index, 1);
			}, 0);
		} else if (
			player.position.x + player.width >= monster.position.x &&
			player.position.y + player.height >= monster.position.y &&
			player.position.x <= monster.position.x + monster.width
		) {
			// 게임 오버 함수 띄우기
			// audio.hurt.play();
		}
	});

	particles.forEach(particle => {
		particle.update();
	});

	player.update(gravity, canvas, ctx);

	if (game.disableUserInput) return;

	let hitSide = false;

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
			for (let i = 0; i < platforms.length; i++) {
				const platform = platforms[i];
				platform.velocity.x = -player.speed;

				if (
					platform.block &&
					hitSideOfPlatform({
						object: player,
						platform,
					})
				) {
					platforms.forEach(platform => {
						platform.velocity.x = 0;
					});

					hitSide = true;
					break;
				}
			}

			if (!hitSide) {
				scrollOffSet += player.speed;
				flag.velocity.x = -player.speed;

				platforms.forEach(platform => {
					platform.velocity.x = -player.speed;
				});

				monsters.forEach(monster => {
					monster.position.x -= player.speed;
				});

				particles.forEach(particle => {
					particle.position.x -= player.speed;
				});
			}
		} else if (keys.left.pressed && scrollOffSet > 0) {
			for (let i = 0; i < platforms.length; i++) {
				const platform = platforms[i];
				platform.velocity.x = player.speed;

				if (
					platform.block &&
					hitSideOfPlatform({
						object: player,
						platform,
					})
				) {
					platforms.forEach(platform => {
						platform.velocity.x = 0;
					});

					hitSide = true;
					break;
				}
			}

			if (!hitSide) {
				scrollOffSet -= player.speed;
				flag.velocity.x = player.speed;

				monsters.forEach(monster => {
					monster.position.x += player.speed;
				});

				particles.forEach(particle => {
					particle.position.x += player.speed;
				});
			}
		}
	}

	// 지형 인식
	platforms.forEach(platform => {
		if (isOnTopOfPlatform({ object: player, platform })) {
			player.velocity.y = 0;
		}

		if (
			platform.block &&
			hitBottomOfPlatform({
				object: player,
				platform,
			})
		) {
			player.velocity.y = -player.velocity.y;
		}

		if (
			platform.block &&
			hitSideOfPlatform({
				object: player,
				platform,
			})
		) {
			player.velocity.x = 0;
		}

		particles.forEach((particle, index) => {
			if (isOnTopOfPlatformCircle({ object: particle, platform })) {
				player.velocity.y = -particle.velocity.y * 0.9;

				if (particle.radius - 0.4 < 0) {
					particles.splice(index, 1);
				} else {
					particle.radius -= 0.4;
				}
			}

			if (particle.timeTheLess < 0) {
				particles.splice(index, 1);
			}
		});

		monsters.forEach(monster => {
			if (isOnTopOfPlatform({ object: monster, platform })) {
				monster.velocity.y = 0;
			}
		});
	});

	if (player.velocity.y === 0) {
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

		if (
			keys.left.pressed &&
			lastKey === "left" &&
			player.currentSprite !== player.sprites.run.left
		) {
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
	}

	if (platformImg && scrollOffSet === 4000) {
		// audio.gameWin.play();
		// 게임 위너 함수 띄우기
	}

	if (player.position.y > canvas.height) {
		// audio.falling.play();
		// 게임 오버 함수 띄우기
	}
}

// init();
initLevel2();
animate();

// const modal = document.querySelector(".modal");
// const startButton = document.querySelector(".start-button");
// const howToPlayButton = document.querySelector(".game-explain");
// const playButton = document.querySelector(".play-button");
// const startPage = document.querySelector(".start-page");
// const modalContainer = document.querySelector(".modal-container");

// function openHowToPlayModal() {
// 	modal.classList.add("open");
// }

// function showCanvas() {
// 	modal.classList.remove("open");
// 	startPage.classList.add("close");
// 	modalContainer.classList.add("close");

// 	init();
// 	animate();
// }

// howToPlayButton.addEventListener("click", openHowToPlayModal);
// playButton.addEventListener("click", showCanvas);

// startButton.addEventListener("click", showCanvas);

addEventListener("keydown", event => {
	if (game.disableUserInput) return;

	switch (event.code) {
		case "KeyA":
			keys.left.pressed = true;
			lastKey = "left";
			break;

		case "KeyD":
			keys.right.pressed = true;
			lastKey = "right";
			break;

		case "KeyW":
			if (player.position.y < 0) {
				player.position.y = 0;
			} else {
				player.velocity.y -= 18;
			}

			if (lastKey === "right") {
				player.currentSprite = player.sprites.jump.right;
			}

			if (lastKey === "left") {
				player.currentSprite = player.sprites.jump.left;
			}

			break;

		// no default
	}
});

addEventListener("keyup", event => {
	if (game.disableUserInput) return;

	switch (event.code) {
		case "KeyA":
			keys.left.pressed = false;
			break;

		case "KeyD":
			keys.right.pressed = false;
			break;

		case "KeyW":
			break;

		// no default
	}
});