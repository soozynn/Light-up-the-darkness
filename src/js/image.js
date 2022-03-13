import backgroundLevel1 from "../assets/img/background/level1/background_01.png";
import obstacleLevel1 from "../assets/img/obstacle/level1/iceObstacle.png";
import largeObstacleLevel1 from "../assets/img/obstacle/level1/iceLargeObstacle.png";
import smallPlatformLevel1 from "../assets/img/platform/level1/iceSmallPlatform.png";
import platformLevel1 from "../assets/img/platform/level1/icePlatform.png";

import backgroundLevel2 from "../assets/img/background/level2/background_02.png";
import obstacleLevel2 from "../assets/img/obstacle/level2/fireObstacle.png";
import largeObstacleLevel2 from "../assets/img/obstacle/level2/fireLargeObstacle.png";
import platformLevel2 from "../assets/img/platform/level2/firePlatform.png";
import largePlatformLevel2 from "../assets/img/platform/level2/fireLargePlatform.png";
import mountainLevel2 from "../assets/img/background/level2/mountains.png";
import sunLevel2 from "../assets/img/background/level2/sun.png";

import backgroundLevel3 from "../assets/img/background/level3/background_03.png";
import obstacleLevel3 from "../assets/img/obstacle/level3/darkObstacle.png";
import largeObstacleLevel3 from "../assets/img/obstacle/level3/darkLargeObstacle.png";
import smallPlatformLevel3 from "../assets/img/platform/level3/darkSmallPlatform.png";
import platformImageLevel3 from "../assets/img/platform/level3/darkPlatform.png";

export const images = {
	levels: {
		1: {
			background: backgroundLevel1,
			smallPlatform: smallPlatformLevel1,
			platform: platformLevel1,
			obstacle: obstacleLevel1,
			largeObstacle: largeObstacleLevel1,
		},
		2: {
			background: backgroundLevel2,
			platform: platformLevel2,
			largePlatform: largePlatformLevel2,
			obstacle: obstacleLevel2,
			largeObstacle: largeObstacleLevel2,
			mountain: mountainLevel2,
			sun: sunLevel2,
		},
		3: {
			background: backgroundLevel3,
			smallPlatform: smallPlatformLevel3,
			platform: platformImageLevel3,
			obstacle: obstacleLevel3,
			largeObstacle: largeObstacleLevel3,
		},
	},
};
