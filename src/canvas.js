/* eslint-disable no-param-reassign */
// eslint-disable-next-line max-classes-per-file
import gsap from "gsap";

import Player from "./gameObjects/Player";
import Platform from "./gameObjects/Platform";
import GenericObject from "./gameObjects/GenericObject";
import Monster from "./gameObjects/Monster";
import Particle from "./gameObjects/Particle";

import flagImage from "./assets/img/flag/flag.png";
import spriteGreenMonster from "./assets/img/monster/walkGreen.png";
import spriteBrownMonster from "./assets/img/monster/walkBrown.png";
import spritePurpleMonster from "./assets/img/monster/walkPurple.png";

// import database from "./database";
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
let gravity = 1.5;

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

let scrollOffSet = 0;
let gameOver = true;
let flag;
let currentLevel = 1;

async function initLevel1() {
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
	];
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
		new Platform({ x: platformImg.width * 3 + 200, y: 470, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 380, y: 470, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 6 + 450, y: 742, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 480, y: 442, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 8 + 480, y: 742, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 9 + 480, y: 542, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 9 + 480, y: 642, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 9 + 480, y: 742, image: platformImg, block: true }),
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
	platformImg = await createImageAsync(images.levels[2].largePlatform);
	smallPlatformImg = await createImageAsync(images.levels[2].platform);
	obstacleImg = await createImageAsync(images.levels[2].obstacle);
	largeObstacleImg = await createImageAsync(images.levels[2].largeObstacle);
	flagImg = await createImageAsync(flagImage);
	mountainsImg = await createImageAsync(images.levels[2].mountain);
	flag = new GenericObject({
		x: platformImg.width * 7 + 580,
		y: 100,
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
		new Platform({
			x: platformImg.width * 4 + 200 + platformImg.width - smallPlatformImg.width,
			y: 270,
			image: smallPlatformImg,
			block: true,
		}),
		new Platform({ x: -1, y: 762, image: platformImg, block: true }),
		new Platform({
			x: platformImg.width + 300,
			y: 762,
			image: platformImg,
			block: true,
		}),
		new Platform({ x: platformImg.width * 2 + 100, y: 762, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 300, y: 470, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 480, y: 470, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 480, y: 470, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 480, y: 570, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 480, y: 570, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 480, y: 670, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 480, y: 670, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 5 + 480, y: 770, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 7 + 480, y: 770, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 6 + 580, y: 762, image: smallPlatformImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 100, y: -170, image: largeObstacleImg, block: true }),
		new Platform({ x: platformImg.width * 3 + 100, y: -220, image: obstacleImg, block: true }),
		new Platform({ x: platformImg.width + 180, y: -100, image: obstacleImg, block: true }),
		new Platform({ x: platformImg.width + 180, y: -100, image: largeObstacleImg, block: true }),
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
	platformImg = await createImageAsync(images.levels[3].platform);
	smallPlatformImg = await createImageAsync(images.levels[3].smallPlatform);
	obstacleImg = await createImageAsync(images.levels[3].obstacle);
	largeObstacleImg = await createImageAsync(images.levels[3].largeObstacle);
	flagImg = await createImageAsync(flagImage);

	flag = new GenericObject({
		x: platformImg.width * 11 + 700,
		y: canvas.height - platformImg.height - flagImg.height - 220,
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
		new Platform({ x: platformImg.width * 9 + 580, y: 220, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 9 + 580, y: 320, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 9 + 580, y: 420, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 9 + 580, y: 520, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 9 + 580, y: 620, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 9 + 580, y: 720, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 9 + 580, y: 820, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 11 + 580, y: 820, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 11 + 580, y: 720, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 11 + 580, y: 620, image: platformImg, block: true }),
		new Platform({ x: platformImg.width * 11 + 580, y: 520, image: platformImg, block: true }),
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
	const soundOnButton = document.querySelector(".music-on");
	const soundOffButton = document.querySelector(".music-off");
	let audioOn = true;

	soundOnButton.classList.add("open");

	if (audioOn && !audio.backgroundMusic.playing()) {
		audio.backgroundMusic.play();
	}

	soundOnButton.addEventListener("click", () => {
		soundOnButton.classList.add("close");
		soundOffButton.classList.add("open");
		audioOn = false;

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

			audio.gameWin.play();
			winGame();
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
				audio.hurt.play();
			}

			setTimeout(() => {
				if (gameOver) {
					if (audio.backgroundMusic.playing()) {
						console.log("재생 중");
						audio.backgroundMusic.stop();
					}

					audio.gameOver.play();
					winGame();

					gameOver = false;
				}
			});
		}
	});

	particles.forEach(particle => {
		particle.update(ctx, canvas, gravity);
	});

	player.update(gravity, canvas, ctx);

	let hitSide = false;

	if (keys.right.pressed && player.position.x < 400) {
		player.velocity.x = player.speed;
		setPercent(player.position.x, flag.position.x, 700000);
	} else if (
		(keys.left.pressed && player.position.x > 100) ||
		(keys.left.pressed && scrollOffSet === 0 && player.position.x > 0)
	) {
		player.velocity.x = -player.speed;
	} else {
		player.velocity.x = 0;

		if (keys.right.pressed) {
			setPercent(player.position.x, flag.position.x, 700000);

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

	if (player.position.y > canvas.height) {
		if (audio.backgroundMusic.playing()) {
			audio.backgroundMusic.stop();
		}
		player.currentSprite = player.sprites.hurt.right;
		player.speed = 0;
		player.velocity.y = 0;
		loseGame();
		console.log(player.position.y, canvas.height);

		setTimeout(() => {
			if (gameOver) {
				audio.falling.play();
				audio.gameOver.play();
				gameOver = false;
			}
		});
	}
}

let jump = true;

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

		analyser.smoothingTimeConstant = 0.8;
		analyser.fftSize = 1024;

		microphone.connect(analyser);
		analyser.connect(scriptProcessor);
		scriptProcessor.connect(audioContext.destination);

		scriptProcessor.onaudioprocess = function () {
			const dataArray = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(dataArray);
			const arraySum = dataArray.reduce((acc, value) => acc + value) / dataArray.length;
			const average = arraySum;
			console.log(average);

			if (jump && 30 < average) {
				player.velocity.y -= average;
				jump = false;
			}

			if (10 < average) {
				keys.right.pressed = true;
				lastKey = "right";
			}

			if (average < 5) {
				keys.right.pressed = false;
				player.velocity.y = 0;
				player.velocity.x = 0;
			}

			if (!player.velocity.y) {
				jump = true;
			}

			// if (player.position.y < canvas.height) {
			// 	player.velocity.y += average;
			// 	player.velocity.x += average;
			// }
		};
	})
	.catch(err => {
		console.error(err);
	});

// start page
const startButton = document.querySelector(".start-button");
const howToPlayButton = document.querySelector(".how-to-play-button");
const closeButton = document.querySelector(".close-button");
const startPage = document.querySelector(".start-page");
const modalContainer = document.querySelector(".modal-container");
const input = document.querySelector(".nickname-input");

const levelSelectPage = document.querySelector(".level-page");
const level1Button = document.querySelector(".level-1");
const level2Button = document.querySelector(".level-2");
const level3Button = document.querySelector(".level-3");

const body = document.querySelector("body");
const gameResultModal = document.createElement("div");
const gameResultTitle = document.createElement("p");
const gameResultSubText = document.createElement("p");
const backButton = document.createElement("button");
const gameStartButton = document.createElement("button");
const gameResultButtonsContainer = document.createElement("div");

function showLevelPage() {
	canvas.classList.remove("open");
	startPage.classList.add("close");
	modalContainer.classList.remove("open");
	levelSelectPage.classList.add("open");
	gameResultModal.classList.remove("result-modal");
}

function startLevel1() {
	levelSelectPage.classList.remove("open");
	canvas.classList.add("open");

	initLevel1();
	animate();
}

function startLevel2() {
	levelSelectPage.classList.remove("open");
	canvas.classList.add("open");

	initLevel2();
	animate();
}

function startLevel3() {
	levelSelectPage.classList.remove("open");
	canvas.classList.add("open");

	initLevel3();
	animate();
}

// 레벨 고르기
function selectLevel(level) {
	levelSelectPage.classList.remove("open");
	gameResultModal.classList.remove("result-modal");

	switch (level) {
		case 1:
			initLevel1();
			currentLevel++;
			break;

		case 2:
			initLevel2();
			currentLevel++;
			break;

		case 3:
			initLevel3();
			break;

		// no default
	}
}

input.addEventListener("keyup", e => {
	const { value } = e.currentTarget;

	if (!value) {
		startButton.disabled = true;
		return;
	}

	startButton.disabled = false;
});

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
	if (gameOver) {
		gameOver = false;

		body.appendChild(gameResultModal);
		gameResultModal.appendChild(gameResultTitle);
		gameResultModal.appendChild(gameResultSubText);
		gameResultModal.appendChild(gameResultButtonsContainer);
		gameResultButtonsContainer.appendChild(backButton);
		gameResultButtonsContainer.appendChild(gameStartButton);

		gameResultTitle.textContent = "Game Over";
		gameStartButton.textContent = "Restart";
		backButton.textContent = "Back";
		gameResultSubText.textContent = "Don't give up and try again.";

		gameResultModal.classList.add("result-modal");
		gameResultTitle.classList.add("game-over");
		gameResultSubText.classList.add("result-sub-text");
		gameResultButtonsContainer.classList.add("buttons");
		gameStartButton.classList.add("play-button");
		backButton.classList.add("play-button");

		backButton.addEventListener("click", showLevelPage);
		gameStartButton.addEventListener("click", () => {
			gameResultModal.classList.add("close");

			setTimeout(() => {
				gravity = 1.5;
				selectLevel(currentLevel);
			});
		});
	}
}

function winGame() {
	if (gameOver) {
		gameOver = false;

		body.appendChild(gameResultModal);
		gameResultModal.appendChild(gameResultTitle);
		gameResultModal.appendChild(gameResultSubText);
		gameResultModal.appendChild(gameResultButtonsContainer);
		gameResultButtonsContainer.appendChild(backButton);
		gameResultButtonsContainer.appendChild(gameStartButton);

		gameResultTitle.textContent = "Clear!";
		gameStartButton.textContent = "Next";
		backButton.textContent = "Back";
		gameResultSubText.textContent = "Do you want to move on to the next level?";

		gameResultModal.classList.add("result-modal");
		gameResultTitle.classList.add("game-win");
		gameResultSubText.classList.add("result-sub-text");
		gameResultButtonsContainer.classList.add("buttons");
		gameStartButton.classList.add("play-button");
		backButton.classList.add("play-button");

		backButton.addEventListener("click", showLevelPage);
		gameStartButton.addEventListener("click", () => {
			gameResultModal.classList.remove("result-modal");

			setTimeout(() => {
				gravity = 1.5;
				currentLevel++;
				selectLevel(currentLevel);
			});
		});
	}
}
