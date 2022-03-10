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
