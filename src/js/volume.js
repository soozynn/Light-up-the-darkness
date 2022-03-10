// export function VolumeMeter(stream) {
// 	this.volume = 0;
// 	this.stream = stream;
// 	this.audioProcessor = this.audioProcessor(stream);
// }

// VolumeMeter.prototype.audioProcessor = function audioProcessor(stream) {
// 	const audioContext = new AudioContext();
// 	const microphone = audioContext.createMediaStreamSource(stream);
// 	const analyser = audioContext.createAnalyser();
// 	const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

// 	analyser.fftSize = 1024;
// 	analyser.smoothingTimeConstant = 0.8;

// 	microphone.connect(analyser);
// 	analyser.connect(scriptProcessor);
// 	scriptProcessor.connect(audioContext.destination);

// 	this.analyser = analyser;
// 	this.processor = scriptProcessor;
// };

// VolumeMeter.prototype.getVolume = function getVolume() {
// 	const bufferLength = this.analyser.frequencyBinCount;
// 	const dataArray = new Uint8Array(bufferLength);
// 	this.analyser.getByteFrequencyData(dataArray);
// 	const arraySum = dataArray.reduce((acc, item) => acc + item) / dataArray.length;
// 	this.volume = arraySum;
// 	console.log(this.volume);
// 	return this.volume;
// };
// export function getVolume() {
// 	let jump = true;

// 	return navigator.mediaDevices
// 		.getUserMedia({
// 			audio: true,
// 			video: false,
// 		})
// 		.then(function (stream) {
// 			const audioContext = new AudioContext();
// 			const analyser = audioContext.createAnalyser();
// 			const microphone = audioContext.createMediaStreamSource(stream);
// 			const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

// 			analyser.smoothingTimeConstant = 0.8;
// 			analyser.fftSize = 1024;

// 			microphone.connect(analyser);
// 			analyser.connect(scriptProcessor);
// 			scriptProcessor.connect(audioContext.destination);
// 			scriptProcessor.onaudioprocess = function () {
// 				const array = new Uint8Array(analyser.frequencyBinCount);
// 				analyser.getByteFrequencyData(array);
// 				const arraySum = array.reduce((a, value) => a + value, 0);
// 				const average = arraySum / array.length;
// 				console.log(Math.round(average));
// 				if (2 < average < 20) {
// 					keys.right.pressed = true;
// 					lastKey = "right";
// 				}

// 				if (20 < average && jump) {
// 					player.velocity.y -= 18;
// 					jump = false;
// 				}

// 				if (average < 5) {
// 					keys.right.pressed = false;
// 					player.velocity.y = 0;
// 				}

// 				if (!player.velocity.y) {
// 					jump = true;
// 				}
// 			};
// 		})
// 		.catch(function (err) {
// 			/* handle the error */
// 			console.error(err);
// 		});
// }
