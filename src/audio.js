import { Howl } from "howler";
import audioMonsterSquash from "./audio/AudioMonsterSquash.mp3";
import audioGameOver from "./audio/audioGameOver.mp3";
import audioGameWin from "./audio/audioGameWin.mp3";
import audioStage1Music from "./audio/audioBackground01.mp3";
import audioFalling from "./audio/audioFalling.wav";
import audioHurt from "./audio/audioHurt.wav";

export const audio = {
	gameOver: new Howl({
		src: [audioGameOver],
		volume: 0.2,
	}),
	gameWin: new Howl({
		src: [audioGameWin],
		volume: 0.2,
	}),
	stage1: new Howl({
		src: [audioStage1Music],
		volume: 0.5,
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
		volume: 0.5,
	}),
};
