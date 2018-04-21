import store from '@/store';
import { nonNegative } from '@/utils/functions';

const MUSIC_NAME = 'vivaldi';
const sounds = [
	'bonus',
	'destroy',
	'hit',
	'impact',
	'misfire',
	'nuke',
	'shot',
	'keydown',
	'win',
	MUSIC_NAME,
].reduce((total, soundName) => ({
		...total,
		[soundName]: new Audio(require(`../assets/sounds/${soundName}.mp3`)),
	}), {});


function isAudioEnabled() {
	return store.state.audioEnabled;
}

function isMusicEnabled() {
	return store.state.musicEnabled;
}

function rewindAndPlay(soundName) {
	sounds[soundName].currentTime = 0;
	sounds[soundName].play();
}

export function playSound(soundName) {
	if (isAudioEnabled()) {
		rewindAndPlay(soundName);
	}
}

export function startMusic() {
	if (isMusicEnabled()) {
		sounds[MUSIC_NAME].volume = 1;
		sounds[MUSIC_NAME].loop = true;
		rewindAndPlay(MUSIC_NAME);
	}
}

export function stopMusic() {
	fadeSound(MUSIC_NAME)
		.then(() => pauseSound(MUSIC_NAME));
}

window.stopMusic = stopMusic;

function pauseSound(soundName) {
	sounds[soundName].pause();
}

function fadeSound(soundName) {
	let fadingInterval;

	return new Promise((resolve) => {
		fadingInterval = setInterval(() => {
			const soundVolume = sounds[soundName].volume;
			const soundLowerVolume = nonNegative(soundVolume - 0.1);
			sounds[soundName].volume = soundLowerVolume;

			if (!soundLowerVolume) {
				clearInterval(fadingInterval);
				resolve();
			}
		}, 100);
	});
}
