import { Howl } from "howler";
import audioMonsterSquash from "../assets/audio/audioMonsterSquash.mp3";
import audioGameOver from "../assets/audio/audioGameOver.mp3";
import audioGameWin from "../assets/audio/audioGameWin.mp3";
import audioStage1Music from "../assets/audio/audioBackground01.mp3";
import audioFalling from "../assets/audio/audioFalling.wav";
import audioHurt from "../assets/audio/audioHurt.wav";

export const audio = {
	gameOver: new Howl({
		src: [audioGameOver],
		volume: 0.2,
	}),
	gameWin: new Howl({
		src: [audioGameWin],
		volume: 0.2,
	}),
	backgroundMusic: new Howl({
		src: [audioStage1Music],
		volume: 0.1,
	}),
	monsterSquash: new Howl({
		src: [audioMonsterSquash],
		volume: 0.2,
	}),
	falling: new Howl({
		src: [audioFalling],
		volume: 0.3,
	}),
	hurt: new Howl({
		src: [audioHurt],
		volume: 0.1,
<<<<<<< HEAD
=======
	}),
<<<<<<< HEAD
	jump: new Howl({
		src: [audioJump],
		volume: 0.2,
>>>>>>> a3f09f8 (Fix: background audio bug)
	}),
=======
>>>>>>> 278f9f4 (Fix: audio 중복 bug)
};
