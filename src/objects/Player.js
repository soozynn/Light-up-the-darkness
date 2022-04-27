import spriteRunRightImage from "../assets/images/player/runToTheRight.png";
import spriteRunLeftImage from "../assets/images/player/runToTheLeft.png";
import spriteStandRightImage from "../assets/images/player/idleRight.png";
import spriteStandLeftImage from "../assets/images/player/idleLeft.png";
import spriteJumpingRightImage from "../assets/images/player/jumpingRight.png";
import spriteJumpingLeftImage from "../assets/images/player/jumpingLeft.png";
import spriteHurtImage from "../assets/images/player/hurt.png";
import spritesFallingImage from "../assets/images/player/falling.png";
import { createImage } from "../js/utils";

export default class Player {
	constructor() {
		this.speed = 2;
		this.position = {
			x: 100,
			y: -100,
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
		this.staggerFrames = 18;
		this.sprites = {
			stand: {
				right: createImage(spriteStandRightImage),
				left: createImage(spriteStandLeftImage),
				cropWidth: 32,
				width: 64,
			},
			run: {
				right: createImage(spriteRunRightImage),
				left: createImage(spriteRunLeftImage),
				cropWidth: 32,
				width: 64,
			},
			jump: {
				right: createImage(spriteJumpingRightImage),
				left: createImage(spriteJumpingLeftImage),
				cropWidth: 32,
				width: 64,
			},
			hurt: {
				right: createImage(spriteHurtImage),
				cropWidth: 32,
				width: 64,
			},
			falling: {
				right: createImage(spritesFallingImage),
				cropWidth: 32,
				width: 64,
			},
		};

		this.currentSprite = this.sprites.stand.right;
		this.currentCropWidth = 32;
	}

	draw(ctx) {
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

	update(gravity, canvas, ctx) {
		if (this.frameSpeed % this.staggerFrames === 0) {
			this.frames++;
		}

		if (this.frames > 3.5 && this.currentSprite === this.sprites.stand.right) {
			this.frames = 0;
		}

		if (this.frames > 3.5 && this.currentSprite === this.sprites.falling.right) {
			this.frames = 0;
		}

		if (this.frames > 5.5 && this.currentSprite === this.sprites.run.right) {
			this.frames = 0;
		}

		if (this.frames > 7.5 && this.currentSprite === this.sprites.jump.right) {
			this.frames = 0;
		}

		this.frameSpeed++;
		this.draw(ctx);
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity;
		}
	}
}
