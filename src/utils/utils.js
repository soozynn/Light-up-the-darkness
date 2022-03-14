const percent = document.getElementById("percent");
let totalPercent = 0;

export function createImage(imageSrc) {
	const image = new Image();
	image.src = imageSrc;
	return image;
}

export function createImageAsync(imageSrc) {
	return new Promise(resolve => {
		const image = new Image();
		image.onload = () => {
			resolve(image);
		};

		image.src = imageSrc;
	});
}

export function isOnTopOfPlatform({ object, platform }) {
	return (
		object.position.y + object.height <= platform.position.y &&
		object.position.y + object.height + object.velocity.y >= platform.position.y &&
		object.position.x + object.width >= platform.position.x &&
		object.position.x <= platform.position.x + platform.width
	);
}

export function collisionTop({ object1, object2 }) {
	return (
		object1.position.y + object1.height <= object2.position.y &&
		object1.position.y + object1.height + object1.velocity.y >= object2.position.y &&
		object1.position.x + object1.width >= object2.position.x &&
		object1.position.x <= object2.position.x + object2.width
	);
}

export function isOnTopOfPlatformCircle({ object, platform }) {
	return (
		object.position.y + object.radius <= platform.position.y &&
		object.position.y + object.radius + object.velocity.y >= platform.position.y &&
		object.position.x + object.radius >= platform.position.x &&
		object.position.x <= platform.position.x + platform.width
	);
}

export function hitBottomOfPlatform({ object, platform }) {
	return (
		object.position.y <= platform.position.y + platform.height &&
		object.position.y - object.velocity.y >= platform.position.y + platform.height &&
		object.position.x + object.width >= platform.position.x &&
		object.position.x <= platform.position.x + platform.width
	);
}

export function hitSideOfPlatform({ object, platform }) {
	return (
		object.position.x + object.width + object.velocity.x + platform.velocity.x >=
			platform.position.x &&
		object.position.x + object.velocity.x <= platform.position.x + platform.width &&
		object.position.y <= platform.position.y + platform.height &&
		object.position.y + object.height >= platform.position.y
	);
}

export function touchObjects({ object1, object2 }) {
	return (
		object1.position.x + object1.width >= object2.position.x &&
		object1.position.x <= object2.position.x + object2.width &&
		object1.position.y + object1.height >= object2.position.y &&
		object1.position.y <= object2.position.y + object2.height
	);
}

let beEecutedTwice = false;
let flagPosition;
export function setPercent(player, flag, distance, restart) {
	if (restart) {
		percent.textContent = `00`;
	}

	if (!beEecutedTwice) {
		flagPosition = flag;
		beEecutedTwice = true;
		return;
	}

	const onePercent = Math.round(distance) / 100;
	let result = Math.round(totalPercent / onePercent);

	if (player <= 400) {
		totalPercent += Math.abs(100 - player);
	} else {
		totalPercent += Math.abs(flagPosition - flag);
	}

	if (result > 100) {
		result = 100;
	}

	if (result < 10) {
		percent.textContent = `0${result}`;
		return;
	}

	percent.textContent = result;
}
