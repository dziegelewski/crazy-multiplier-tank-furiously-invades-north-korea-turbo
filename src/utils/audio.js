const sounds = [
	'bonus',
	'destroy',
	'hit',
	'impact',
	'misfire',
	'nuke',
	'shot',
	'keydown',
	'vivaldi',
	'win',
].reduce((total, soundName) => {
	return {
		...total,
		[soundName]: new Audio(require(`../assets/sounds/${soundName}.mp3`)),
	};
}, {});

const audio = (soundName) => {
	sounds[soundName].play();
};

audio.stop = function(soundName) {
	sounds[soundName].stop();
};

export default audio;
