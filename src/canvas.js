/* eslint-disable no-param-reassign */
// eslint-disable-next-line max-classes-per-file
import gsap from "gsap";

import Player from "./gameObjects/Player";
import Platform from "./gameObjects/Platform";
import GenericObject from "./gameObjects/GenericObject";
import Monster from "./gameObjects/Monster";
import Particle from "./gameObjects/Particle";

import flagImage from "./assets/images/flag/flag.png";
import spriteGreenMonster from "./assets/images/monster/walkGreen.png";
import spriteBrownMonster from "./assets/images/monster/walkBrown.png";
import spritePurpleMonster from "./assets/images/monster/walkPurple.png";

import { key, result, screen, flagPosition, volume } from "./constants/constants";
import { audio } from "./js/audio";
import { images } from "./js/image";
import {
	isOnTopOfPlatform,
	collisionTop,
	isOnTopOfPlatformCircle,
	createImage,
	createImageAsync,
	hitBottomOfPlatform,
	hitSideOfPlatform,
	touchObjects,
	setPercent,
} from "./js/utils";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const soundOnButton = document.querySelector(".music-on");
const soundOffButton = document.querySelector(".music-off");
const percent = document.querySelector(".percent-container");
const startButton = document.querySelector(".start-button");
const howToPlayButton = document.querySelector(".how-to-play-button");
const closeButton = document.querySelector(".close-button");
const startPage = document.querySelector(".start-page");
const modalContainer = document.querySelector(".modal-container");
const resultModal = document.querySelector(".result-modal");

const levelSelectPage = document.querySelector(".level-page");
const level1Button = document.querySelector(".level-1");
const level2Button = document.querySelector(".level-2");
const level3Button = document.querySelector(".level-3");

canvas.width = 1090;
canvas.height = innerHeight;

let platformImg;
let smallPlatformImg;
let obstacleImg;
let largeObstacleImg;
let flagImg;
let mountainsImg;

let player = new Player(createImage);
let platforms = [];
let genericObjects = [];
let monsters = [];
const particles = [];

let lastKey;
const keys = {
	right: {
		pressed: false,
	},
	left: {
		pressed: false,
	},
};

let gravity = 1.5;
let scrollOffSet = 0;
let restart = false;
let gameOver = true;
let flag;
let currentLevel = 1;

async function initLevel1() {
	soundOnButton.classList.add("open");
	percent.classList.add("show");

	if (audio.backgroundMusic.playing() || audio.gameOver.playing() || audio.gameWin.playing()) {
		audio.backgroundMusic.stop();
		audio.backgroundMusic.play();
		audio.gameOver.stop();
		audio.gameWin.stop();
	}

	if (!audio.backgroundMusic.playing()) {
		audio.backgroundMusic.play();
	}

	soundOnButton.addEventListener("click", () => {
		soundOnButton.classList.add("close");
		soundOffButton.classList.add("open");

		if (audio.backgroundMusic.playing()) {
			audio.backgroundMusic.stop();
		}
	});
	soundOffButton.addEventListener("click", () => {
		soundOnButton.classList.remove("close");
		soundOffButton.classList.remove("open");

		if (!audio.backgroundMusic.playing()) {
			audio.backgroundMusic.play();
		}
	});

	platformImg = await createImageAsync(images.levels[1].platform);
	smallPlatformImg = await createImageAsync(images.levels[1].smallPlatform);
	obstacleImg = await createImageAsync(images.levels[1].obstacle);
	largeObstacleImg = await createImageAsync(images.levels[1].largeObstacle);
	flagImg = await createImageAsync(flagImage);

	flag = new GenericObject({
		x: platformImg.width * 10 + 100,
		y: 180,
		image: flagImg,
	});
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
			image: createImage(spriteGreenMonster),
			distance: {
				limit: 200,
				traveled: 0,
			},
		}),
	];
	platforms = [
		new Platform({ x: -1, y: 742, image: platformImg, block: true }),
		new Platform({
			x: platformImg.width - 3,
			y: 742,
			image: platformImg,
			block: true,
		}),
		new Platform({ x: platformImg.width * 2 + 200, y: 742, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 400, y: 450, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 400, y: 550, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 400, y: 650, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 400, y: 750, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 200, y: 470, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 200, y: 570, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 200, y: 670, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 200, y: 770, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 200, y: 442, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 200, y: 542, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 200, y: 642, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 200, y: 742, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 9 + 400, y: 542, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 9 + 400, y: 642, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 9 + 400, y: 742, image: platformImg, block: true }),
	];
	genericObjects = [
		new GenericObject({
			x: -1,
			y: -1,
			image: createImage(images.levels[1].background),
			currentLevel: 1,
		}),
		new GenericObject({
			x: 50,
			y: 100,
			image: createImage(images.levels[2].sun),
		}),
	];

	scrollOffSet = 0;
}

async function initLevel2() {
	currentLevel = 2;
	soundOnButton.classList.add("open");
	percent.classList.add("show");

	if (audio.backgroundMusic.playing() || audio.gameOver.playing() || audio.gameWin.playing()) {
		audio.backgroundMusic.stop();
		audio.backgroundMusic.play();
		audio.gameOver.stop();
		audio.gameWin.stop();
	}

	if (!audio.backgroundMusic.playing()) {
		audio.backgroundMusic.play();
	}

	soundOnButton.addEventListener("click", () => {
		soundOnButton.classList.add("close");
		soundOffButton.classList.add("open");

		if (audio.backgroundMusic.playing()) {
			audio.backgroundMusic.stop();
		}
	});
	soundOffButton.addEventListener("click", () => {
		soundOnButton.classList.remove("close");
		soundOffButton.classList.remove("open");

		if (!audio.backgroundMusic.playing()) {
			audio.backgroundMusic.play();
		}
	});

	platformImg = await createImageAsync(images.levels[2].largePlatform);
	smallPlatformImg = await createImageAsync(images.levels[2].platform);
	obstacleImg = await createImageAsync(images.levels[2].obstacle);
	largeObstacleImg = await createImageAsync(images.levels[2].largeObstacle);
	flagImg = await createImageAsync(flagImage);
	mountainsImg = await createImageAsync(images.levels[2].mountain);
	flag = new GenericObject({
		x: platformImg.width * 5 + 700,
		y: 95,
		image: flagImg,
	});
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
				limit: 250,
				traveled: 0,
			},
		}),
		new Monster({
			position: {
				x: 2800,
				y: 100,
			},
			velocity: {
				x: -0.3,
				y: 0,
			},
			image: createImage(spritePurpleMonster),
			distance: {
				limit: 300,
				traveled: 0,
			},
		}),
		new Monster({
			position: {
				x: 4500,
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
	];
	platforms = [
		new Platform({ x: -1, y: 762, image: platformImg, block: true }),
		new Platform({ x: platformImg.width + 100, y: 762, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 2, y: 470, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 2, y: 570, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 2, y: 670, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 2, y: 770, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 3, y: 770, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 4 + 100, y: 470, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 4 + 100, y: 570, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 4 + 100, y: 670, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 4 + 100, y: 762, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 5, y: 762, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 600, y: 462, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 600, y: 562, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 600, y: 662, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 600, y: 762, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width + 180, y: -100, image: obstacleImg, block: true }),
		new Platform({ x: platformImg.width + 180, y: -100, image: largeObstacleImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 100, y: -170, image: largeObstacleImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 100, y: -220, image: obstacleImg, block: true }),
		new Platform({ x: platformImg.width * 5, y: -170, image: largeObstacleImg, block: true }),
		new Platform({ x: platformImg.width * 5, y: -220, image: obstacleImg, block: true }),
	];
	genericObjects = [
		new GenericObject({
			x: -1,
			y: -1,
			image: createImage(images.levels[2].background),
			currentLevel: 2,
		}),
		new GenericObject({
			x: -1,
			y: canvas.height - mountainsImg.height,
			image: createImage(images.levels[2].mountain),
		}),
		new GenericObject({
			x: 50,
			y: 100,
			image: createImage(images.levels[2].sun),
		}),
	];

	scrollOffSet = 0;
}

async function initLevel3() {
	currentLevel = 3;
	soundOnButton.classList.add("open");
	percent.classList.add("show");

	if (audio.backgroundMusic.playing() || audio.gameOver.playing() || audio.gameWin.playing()) {
		audio.backgroundMusic.stop();
		audio.backgroundMusic.play();
		audio.gameOver.stop();
		audio.gameWin.stop();
	}

	if (!audio.backgroundMusic.playing()) {
		audio.backgroundMusic.play();
	}

	soundOnButton.addEventListener("click", () => {
		soundOnButton.classList.add("close");
		soundOffButton.classList.add("open");

		if (audio.backgroundMusic.playing()) {
			audio.backgroundMusic.stop();
		}
	});
	soundOffButton.addEventListener("click", () => {
		soundOnButton.classList.remove("close");
		soundOffButton.classList.remove("open");

		if (!audio.backgroundMusic.playing()) {
			audio.backgroundMusic.play();
		}
	});

	platformImg = await createImageAsync(images.levels[3].platform);
	smallPlatformImg = await createImageAsync(images.levels[3].smallPlatform);
	obstacleImg = await createImageAsync(images.levels[3].obstacle);
	largeObstacleImg = await createImageAsync(images.levels[3].largeObstacle);
	flagImg = await createImageAsync(flagImage);

	flag = new GenericObject({
		x: 7 + 700,
		y: canvas.height - platformImg.height - flagImg.height - 240,
		image: flagImg,
	});
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
			image: createImage(spriteGreenMonster),
			distance: {
				limit: 200,
				traveled: 0,
			},
		}),
		new Monster({
			position: {
				x: 1700,
				y: 100,
			},
			velocity: {
				x: -0.3,
				y: 0,
			},
			image: createImage(spriteBrownMonster),
			distance: {
				limit: 200,
				traveled: 0,
			},
		}),
		new Monster({
			position: {
				x: 2200,
				y: 100,
			},
			velocity: {
				x: -0.3,
				y: 0,
			},
			image: createImage(spritePurpleMonster),
			distance: {
				limit: 200,
				traveled: 0,
			},
		}),
		new Monster({
			position: {
				x: 2800,
				y: 100,
			},
			velocity: {
				x: -0.5,
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
				x: 3200,
				y: 100,
			},
			velocity: {
				x: -0.3,
				y: 0,
			},
			image: createImage(spriteBrownMonster),
			distance: {
				limit: 200,
				traveled: 0,
			},
		}),
	];
	platforms = [
		new Platform({ x: -1, y: 762, image: platformImg, block: true }),
		new Platform({
			x: platformImg.width - 3,
			y: 770,
			image: platformImg,
			block: true,
		}),
		new Platform({ x: platformImg.width * 2 + 100, y: 670, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 2 + 100, y: 770, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 300, y: 470, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 300, y: 570, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 300, y: 670, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 300, y: 770, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 480, y: 470, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 480, y: 570, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 480, y: 670, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 480, y: 770, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 680, y: 342, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 680, y: 442, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 680, y: 542, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 680, y: 642, image: smallPlatformImg, block: true }),
		new Platform({ x: 600, y: -100, image: obstacleImg, block: true }),
		new Platform({ x: 600, y: -100, image: largeObstacleImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 300, y: -400, image: largeObstacleImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 480, y: -400, image: largeObstacleImg, block: true }),
	];
	genericObjects = [
		new GenericObject({
			x: -1,
			y: -1,
			image: createImage(images.levels[3].background),
			currentLevel: 3,
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
			touchObjects({
				object1: player,
				object2: flag,
			})
		) {
			player.velocity.x = 0;
			player.velocity.y = 0;
			player.currentSprite = player.sprites.stand.right;

			gsap.to(player.position, {
				y: canvas.height - platformImg.height - player.height,
				duration: 1,
			});

			if (gameOver) {
				audio.gameWin.play();
				winGame();
				gameOver = false;
			}
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
			audio.monsterSquash.play();

			setTimeout(() => {
				monsters.splice(index, 1);
			}, 0);
		} else if (
			player.position.x + player.width >= monster.position.x &&
			player.position.y + player.height >= monster.position.y &&
			player.position.x <= monster.position.x + monster.width
		) {
			player.currentSprite = player.sprites.hurt.right;
			player.speed = 0;
			player.velocity.y = 0;

			if (gameOver) {
				loseGame();
				audio.hurt.play();
				audio.gameOver.play();
				gameOver = false;
			}
		}
	});

	particles.forEach(particle => {
		particle.update(ctx, canvas, gravity);
	});

	player.update(gravity, canvas, ctx);

	let hitSide = false;

	if (keys.right.pressed && player.position.x < 400) {
		player.velocity.x = player.speed;

		if (flag.position.x) {
			setPercent(player.position.x, flag.position.x, flagPosition.x);
		}
	} else if (
		(keys.left.pressed && player.position.x > 100) ||
		(keys.left.pressed && scrollOffSet === 0 && player.position.x > 0)
	) {
		player.velocity.x = -player.speed;
	} else {
		player.velocity.x = 0;

		if (keys.right.pressed) {
			if (flag.position.x) {
				setPercent(player.position.x, flag.position.x, flagPosition.x);
			}

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

				genericObjects.forEach(genericObject => {
					genericObject.velocity.x = -player.speed;
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

				genericObjects.forEach(genericObject => {
					genericObject.velocity.x += player.speed;
				});
			}
		}
	}

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
			lastKey === key.RIGHT &&
			player.currentSprite !== player.sprites.run.right
		) {
			player.frames = 1;
			player.currentSprite = player.sprites.run.right;
			player.currentCropWidth = player.sprites.run.cropWidth;
			player.width = player.sprites.run.width;
		}

		if (
			keys.left.pressed &&
			lastKey === key.LEFT &&
			player.currentSprite !== player.sprites.run.left
		) {
			player.currentSprite = player.sprites.run.left;
			player.currentCropWidth = player.sprites.run.cropWidth;
			player.width = player.sprites.run.width;
		}

		if (
			!keys.left.pressed &&
			lastKey === key.LEFT &&
			player.currentSprite !== player.sprites.stand.left
		) {
			player.currentSprite = player.sprites.stand.left;
			player.currentCropWidth = player.sprites.stand.cropWidth;
			player.width = player.sprites.stand.width;
		}

		if (
			!keys.right.pressed &&
			lastKey === key.RIGHT &&
			player.currentSprite !== player.sprites.stand.right
		) {
			player.currentSprite = player.sprites.stand.right;
			player.currentCropWidth = player.sprites.stand.cropWidth;
			player.width = player.sprites.stand.width;
		}
	}

	if (player.position.y > screen.BOTTOM) {
		player.currentSprite = player.sprites.hurt.right;
		player.speed = 0;
		player.velocity.y = 0;

		if (gameOver) {
			loseGame();
			audio.falling.play();
			gameOver = false;
		}

		if (audio.backgroundMusic.playing()) {
			audio.backgroundMusic.stop();
		}
	}
}

navigator.mediaDevices
	.getUserMedia({
		audio: true,
		video: false,
	})
	.then(stream => {
		const audioContext = new AudioContext();
		const analyser = audioContext.createAnalyser();
		const microphone = audioContext.createMediaStreamSource(stream);
		const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

		analyser.minDecibels = -90;
		analyser.maxDecibels = -10;
		analyser.smoothingTimeConstant = 0.85;
		analyser.fftSize = 256;

		microphone.connect(analyser);
		analyser.connect(scriptProcessor);
		scriptProcessor.connect(audioContext.destination);

		scriptProcessor.onaudioprocess = () => {
			const dataArray = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(dataArray);
			const average = Math.floor(dataArray.reduce((acc, value) => acc + value) / dataArray.length);
			console.log(average);
			if (average > volume.SOFT) {
				keys.right.pressed = true;
				lastKey = key.RIGHT;
			}

			if (average < volume.SOFT) {
				keys.right.pressed = false;
				player.velocity.y = 0;
				player.velocity.x = 0;
				return;
			}

			if (average > 5) {
				setTimeout(() => {
					if (player.position.y > screen.CELLING && average > volume.LOUD) {
						player.currentSprite = player.sprites.run.right;
						player.velocity.y = -7;
					}

					if (player.position.y > screen.CELLING && average < volume.LOUD) {
						player.currentSprite = player.sprites.run.right;
						player.velocity.y = -average / 2;
					}
				});
			}
		};
	})
	.catch(err => {
		console.error(err);
	});

const gameResultTitle = document.createElement("p");
const gameResultSubText = document.createElement("p");
const backButton = document.createElement("button");
const gameStartButton = document.createElement("button");
const gameResultButtonsContainer = document.createElement("div");

function showLevelPage() {
	resultModal.classList.remove("show");
	canvas.classList.remove("open");
	startPage.classList.add("close");
	modalContainer.classList.remove("open");
	levelSelectPage.classList.add("open");
	percent.classList.remove("show");
	soundOnButton.classList.remove("open");
}

function startLevel1() {
	levelSelectPage.classList.remove("open");
	canvas.classList.add("open");
	initLevel1();

	if (!restart) {
		animate();
	}
}

function startLevel2() {
	levelSelectPage.classList.remove("open");
	canvas.classList.add("open");
	initLevel2();

	if (!restart) {
		animate();
	}
}

function startLevel3() {
	levelSelectPage.classList.remove("open");
	canvas.classList.add("open");
	initLevel3();

	if (!restart) {
		animate();
	}
}

function selectLevel(level) {
	levelSelectPage.classList.remove("open");
	resultModal.classList.remove("show");
	setPercent(0, 0, 0, 1);

	switch (level) {
		case 1:
			initLevel1();
			break;

		case 2:
			initLevel2();
			break;

		case 3:
			initLevel3();
			break;

		default:
			initLevel3();
	}
}

howToPlayButton.addEventListener("click", () => {
	modalContainer.classList.add("open");
});
closeButton.addEventListener("click", () => {
	modalContainer.classList.remove("open");
});
startButton.addEventListener("click", showLevelPage);

level1Button.addEventListener("click", startLevel1);
level2Button.addEventListener("click", startLevel2);
level3Button.addEventListener("click", startLevel3);

function loseGame() {
	if (audio.backgroundMusic.playing()) {
		audio.backgroundMusic.stop();
	}

	resultModal.appendChild(gameResultTitle);
	resultModal.appendChild(gameResultSubText);
	resultModal.appendChild(gameResultButtonsContainer);
	gameResultButtonsContainer.appendChild(backButton);
	gameResultButtonsContainer.appendChild(gameStartButton);

	gameResultTitle.textContent = result.GAME_OVER;
	gameStartButton.textContent = result.RESTART;
	backButton.textContent = result.BACK;
	gameResultSubText.textContent = result.GAME_OVER_SUB_TEXT;

	resultModal.classList.add("show");
	gameResultTitle.classList.add("game-over");
	gameResultSubText.classList.add("result-sub-text");
	gameResultButtonsContainer.classList.add("buttons");
	gameStartButton.classList.add("play-button");
	backButton.classList.add("play-button");
	gameResultTitle.classList.remove("game-win");

	backButton.addEventListener("click", () => {
		if (
			audio.backgroundMusic.playing() ||
			audio.gameOver.playing() ||
			audio.gameWin.playing() ||
			audio.falling.playing() ||
			audio.hurt.playing()
		) {
			audio.backgroundMusic.stop();
			audio.gameOver.stop();
			audio.gameWin.stop();
			audio.falling.stop();
			audio.hurt.stop();
		}

		gameOver = true;
		restart = true;
		setPercent(0, 0, 0, 1);
		showLevelPage();
	});
	gameStartButton.addEventListener("click", () => {
		resultModal.classList.add("show");
		soundOnButton.classList.remove("close");
		soundOffButton.classList.remove("open");

		setPercent(0, 0, 0, 1);
		gravity = 1.5;
		restart = true;
		gameOver = true;

		setTimeout(() => {
			selectLevel(currentLevel);
		});
	});
}

function winGame() {
	if (audio.backgroundMusic.playing()) {
		audio.backgroundMusic.stop();
	}

	resultModal.appendChild(gameResultTitle);
	resultModal.appendChild(gameResultSubText);
	resultModal.appendChild(gameResultButtonsContainer);
	gameResultButtonsContainer.appendChild(backButton);
	gameResultButtonsContainer.appendChild(gameStartButton);

	gameResultTitle.textContent = result.CLEAR;
	gameStartButton.textContent = result.NEXT_LEVEL;
	backButton.textContent = result.BACK;
	gameResultSubText.textContent = result.GAME_CLEAR_SUB_TEXT;

	resultModal.classList.add("show");
	gameResultTitle.classList.add("game-win");
	gameResultSubText.classList.add("result-sub-text");
	gameResultButtonsContainer.classList.add("buttons");
	gameStartButton.classList.add("play-button");
	backButton.classList.add("play-button");
	gameResultTitle.classList.remove("game-over");

	backButton.addEventListener("click", () => {
		if (
			audio.backgroundMusic.playing() ||
			audio.gameOver.playing() ||
			audio.gameWin.playing() ||
			audio.falling.playing() ||
			audio.hurt.playing()
		) {
			audio.backgroundMusic.stop();
			audio.gameOver.stop();
			audio.gameWin.stop();
			audio.falling.stop();
			audio.hurt.stop();
		}

		gameOver = true;
		restart = true;
		setPercent(0, 0, 0, 1);
		showLevelPage();
	});
	gameStartButton.addEventListener("click", () => {
		resultModal.classList.add("show");
		soundOnButton.classList.remove("close");
		soundOffButton.classList.remove("open");

		setPercent(0, 0, 0, 1);
		gravity = 1.5;
		currentLevel++;
		restart = true;
		gameOver = true;

		setTimeout(() => {
			selectLevel(currentLevel);
		});
	});
}
